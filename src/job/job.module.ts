import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { CronJobService } from './cron-job.service';
import { JobProcessor } from './job.processor';
import { JobController } from './job.controller';

@Module({
  controllers: [JobController],
  providers: [JobService, CronJobService, JobProcessor],
  exports: [JobService]
})
export class JobModule { }
