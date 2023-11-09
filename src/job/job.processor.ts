import { InjectQueue, OnGlobalQueueActive, OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { SendMessageInput } from './input/send-message-input';

@Processor('send-message')
export class JobProcessor {
  constructor(
    @InjectQueue('send-message') private readonly msgQueue: Queue,
  ) { }

  @Process('send-messageJob')
  async handle(job: Job) {
    console.log('-------- messageJob Handler --------');
    const input: SendMessageInput = job.data;
    return await this.process(input);
  }

  @OnQueueActive()
  async onQueueActive(job: Job) {
    console.log('-------- messageJob onQueueActive --------');
    const input: SendMessageInput = job?.data;
    if (input && !(await job?.finished()))
      await this.process(input);
  }

  @OnGlobalQueueActive()
  async onGlobalQueueActive(jobId: string) {
    console.log('-------- messageJob OnGlobalQueueActive --------', jobId);
    const job = await this.msgQueue.getJob(jobId);
    const input: SendMessageInput = job?.data;
    if (input && !(await job?.finished())) {
      await this.process(input);
    }
  }

  private async process(input: SendMessageInput) {
    const jobCase = {
      statusChanged: false
    };
    console.log('-------- send-messageJob process --------');
    try {
      console.log('process', { input });
      jobCase.statusChanged = true;
    } catch (error) {
      console.log('Error -> ', error);
    } finally {
      return jobCase.statusChanged;
    }
  }
}
