import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Log } from 'src/log/models/log.model';
import { Job } from './models/job.model';

@Injectable()
export class JobService {
  @Cron(CronExpression.EVERY_SECOND)
  async handleCron() {
    const logs = await Log.query().where('content', 'like', `%withdrawal%`);
    if (logs.length > 0) {
      let deletedLogs = [];
      const logIds = [];
      logs.map(item => {
        logIds.push(item.id);
        deletedLogs.push({
          log: item.content,
          deletedAt: `${new Date()}`
        });
      });
      await Job.query().insert(deletedLogs);
      await Log.query().delete().whereIn('id', logIds);
      return true;
    } else return;
  }
}
