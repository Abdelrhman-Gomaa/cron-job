import { ExpressAdapter } from '@bull-board/express';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';

@Injectable()
export class QueueUIProvider {
  static router = null;
  constructor(
    @InjectQueue('send-message') private readonly msgQueue: Queue,
    @InjectQueue('track-message') private readonly trackQueue: Queue,
  ) {
    const serverAdapter = new ExpressAdapter().setBasePath('/admin/queues');
    createBullBoard({
      queues: [
        new BullAdapter(this.msgQueue),
        new BullAdapter(this.trackQueue),
      ],
      serverAdapter: serverAdapter
    });
    QueueUIProvider.router = serverAdapter.getRouter();
  }
}
