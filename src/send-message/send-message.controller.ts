import { Controller, Body, Post, Get } from '@nestjs/common';
import { SendMessageService } from './send-message.service';
import { SendMessageInput } from './input/send-message-input';

@Controller('message')
export class SendMessageController {
  constructor(private readonly messageService: SendMessageService) { }

  @Post()
  sendMessage(@Body() input: SendMessageInput) {
    return this.messageService.sendMessage(input);
  }

  @Get()
  trackDelayedMessage() {
    return this.messageService.trackDelayedMessage();
  }

}
