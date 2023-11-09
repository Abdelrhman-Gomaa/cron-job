import { Controller, Body, Post } from '@nestjs/common';
import { JobService } from './job.service';
import { SendMessageInput } from './input/send-message-input';

@Controller('job')
export class JobController {
  constructor(private readonly messageService: JobService) { }

  @Post()
  sendMessage(@Body() input: SendMessageInput) {
    return this.messageService.sendMessage(input);
  }
}
