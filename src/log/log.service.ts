import { Injectable } from '@nestjs/common';
import { UpdateLogInput } from './input/update-log.input';
import { CreateLogInput } from './input/create-log.input';
import { LogsFactory } from './log.factory';

@Injectable()
export class LogService {
  async create(input?: CreateLogInput) {
    await LogsFactory(100)
    return 'This action adds a new log';
  }

  findAll() {
    return `This action returns all log`;
  }

  findOne(id: number) {
    return `This action returns a #${id} log`;
  }

  update(input: UpdateLogInput) {
    return `This action updates a #${input.logId} log`;
  }

  remove(id: number) {
    return `This action removes a #${id} log`;
  }
}
