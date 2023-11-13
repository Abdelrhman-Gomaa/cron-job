import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { SendMessageInput } from './input/send-message-input';
import { Message } from './models/message.model';

@Injectable()
export class SendMessageService {

  constructor(
    @InjectQueue('send-message') private readonly msgQueue: Queue,
    @InjectQueue('track-message') private readonly trackMsgQueue: Queue,
  ) { }

  async sendMessage(input: SendMessageInput) {
    const message = await Message.query().insert({
      to: input.to,
      from: input.from,
      content: input.content
    });
    input.id = message.id;
    await this.msgQueue.add(
      'send-messageJob',
      { ...input },
      { delay: input.dateToRun - new Date().valueOf() }
    );
    return message;
  }

  async trackDelayedMessage() {
    await this.trackMsgQueue.add(
      'track-messageJob',
      {},
      {
        repeat: {
          every: 5 * 60 * 1000,
        },
      }
    );
    // const delayJobs = await this.msgQueue.getJobs(['delayed']);
    // console.log(delayJobs[0].data);
    // return delayJobs
  }
}
