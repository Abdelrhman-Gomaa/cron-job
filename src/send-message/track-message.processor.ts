import { InjectQueue, OnGlobalQueueActive, OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { SendMessageInput } from './input/send-message-input';
import { Message } from './models/message.model';

@Processor('track-message')
export class trackMessageProcessor {
  constructor(
    @InjectQueue('send-message') private readonly msgQueue: Queue,
    @InjectQueue('track-message') private readonly trackMsgQueue: Queue,
  ) { }

  @Process('track-messageJob')
  async handle() {
    console.log('-------- messageJob Handler --------');
    // const input: trackMessageInput = job.data;
    return await this.process();
  }

  @OnQueueActive()
  async onQueueActive(job: Job) {
    console.log('-------- messageJob onQueueActive --------');
    // const input: trackMessageInput = job?.data;
    if (!(await job?.finished()))
      await this.process();
  }

  @OnGlobalQueueActive()
  async onGlobalQueueActive(jobId: string) {
    console.log('-------- messageJob OnGlobalQueueActive --------');
    const job = await this.trackMsgQueue.getJob(jobId);
    // const input: trackMessageInput = job?.data;
    if (!(await job?.finished())) {
      await this.process();
    }
  }

  private async process() {
    const jobCase = {
      statusChanged: false
    };
    console.log('-------- track-messageJob process --------');
    try {
      const delayJobs = await this.msgQueue.getJobs(['delayed']);
      const failedJobs = await this.msgQueue.getJobs(['failed']);

      const failedMessagesIds = failedJobs.map(item => item.data.id);
      const delayMessageIds = delayJobs.map(item => item.data.id);

      const messages = await Message.query().where({ type: 'pending' });

      let successMessageIds = [];
      let failedMessageIds = [];

      messages.map(message => {
        if (!delayMessageIds.includes(message.id)) {
          if (failedMessagesIds.includes(message.id)) failedMessageIds.push(message.id);
          else successMessageIds.push(message.id);
        }
      });

      await Message.query().whereIn('id', successMessageIds).patch({ type: 'success' });
      await Message.query().whereIn('id', failedMessageIds).patch({ type: 'cancelled' });

      jobCase.statusChanged = true;
    } catch (error) {
      console.log('Error -> ', error);
    } finally {
      return jobCase.statusChanged;
    }
  }
}
