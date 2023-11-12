import { Module } from '@nestjs/common';
import { SendMessageService } from './send-message.service';
import { SendMessageProcessor } from './send-message.processor';
import { SendMessageController } from './send-message.controller';
import { trackMessageProcessor } from './track-message.processor';

@Module({
  controllers: [SendMessageController],
  providers: [SendMessageService, SendMessageProcessor, trackMessageProcessor],
  exports: [SendMessageService]
})
export class SendMessageModule { }
