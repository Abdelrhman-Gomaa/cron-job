import { InjectQueue, OnGlobalQueueActive, OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { SendMessageInput } from './input/send-message-input';

@Processor('send-message')
export class trackMessageProcessor {
  constructor(
    @InjectQueue('send-message') private readonly msgQueue: Queue,
    @InjectQueue('track-message') private readonly trackMsgQueue: Queue,
  ) { }

  @Process('track-messageJob')
  async handle(job: Job) {
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
    console.log('-------- messageJob OnGlobalQueueActive --------', jobId);
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
      console.log('>>>>>>>', delayJobs);
      jobCase.statusChanged = true;
    } catch (error) {
      console.log('Error -> ', error);
    } finally {
      return jobCase.statusChanged;
    }
  }
}
