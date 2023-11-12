import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { ScheduleModule } from '@nestjs/schedule';
import { NestBullModule } from './_common/bull/bull.module';
import { SendMessageModule } from './send-message/send-message.module';
import { DatabaseModule } from './_common/database/database.module';

@Module({
  imports: [
    SendMessageModule,
    ScheduleModule.forRoot(),
    DatabaseModule,
    NestBullModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(3000),
      }),
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
