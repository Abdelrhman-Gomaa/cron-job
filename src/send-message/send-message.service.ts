import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue, Job } from 'bull';
import { SendMessageInput } from './input/send-message-input';
import { Message } from './models/message.model';

@Injectable()
export class SendMessageService {

  constructor(
    @InjectQueue('send-message') private readonly msgQueue: Queue,
    @InjectQueue('track-message') private readonly trackMsgQueue: Queue,
  ) { }

  async sendMessage(input: SendMessageInput) {
    await Message.query().insert({
      to: input.to,
      from: input.from,
      content: input.content
    });
    const job = await this.msgQueue.add(
      'send-messageJob',
      { ...input },
      { delay: 10000000000000000 } //new Date().valueOf() - input.dateToRun }
    );
  }

  async trackDelayedMessage() {
    await this.trackMsgQueue.add(
      'track-messageJob',
      {},
      { delay: 1000 }
    );
    // const delayJobs = await this.msgQueue.getJobs(['delayed']);
    // console.log(delayJobs[0].data);
    // return delayJobs
  }
}
