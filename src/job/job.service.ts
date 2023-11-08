import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Log } from 'src/log/models/log.model';
import { DeletedLog } from './models/deleted-log.model';
import { Job } from './models/job.model';

@Injectable()
export class JobService {
  @Cron(CronExpression.EVERY_SECOND)
  async cronToDeleteLogs() {
    const job = await Job.query().findById(1);
    if (job.isActive === true) {
      const logs = await Log.query().where('content', 'like', `%LOG%`);
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
        await DeletedLog.query().insert(deletedLogs);
        await Log.query().delete().whereIn('id', logIds);
        return true;
      } else return;
    } else console.log('Cron Job Stopped Now');
  }

  @Cron(CronExpression.EVERY_SECOND)
  async checkDeletedLogs() {
    const deletedLogs = await DeletedLog.query();
    console.log('>>>>>>>>>>>>>', deletedLogs.length);
    if (deletedLogs.length >= 100)
      await Job.query().findById(1).patch({ isActive: false });
    else await Job.query().findById(1).patch({ isActive: true });
  }
}
