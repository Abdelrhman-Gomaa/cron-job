import { PartialType } from '@nestjs/mapped-types';
import { CreateLogInput } from './create-log.input';

export class UpdateLogInput extends PartialType(CreateLogInput) {
  logId: number
}
