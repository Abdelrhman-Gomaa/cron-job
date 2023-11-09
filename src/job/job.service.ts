import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue, Job } from 'bull';
import { SendMessageInput } from './input/send-message-input';
import { Message } from './models/message.model';

@Injectable()
export class JobService {

  constructor(
    @InjectQueue('send-message') private readonly msgQueue: Queue
  ) { }

  async sendMessage(input: SendMessageInput) {
    await Message.query().insert(input);
    const job = await this.msgQueue.add(
      'send-messageJob',
      { input },
      { delay: 100000, jobId: 'uniqueId' }
    );

    // const job2222 = await this.msgQueue.getJob('uniqueId');
    // job2222.remove();
    const delayJobs = await this.msgQueue.getJobs(['delayed']);
    console.log(delayJobs);

    // console.log('job >>>>>>>', job);
  }
}
