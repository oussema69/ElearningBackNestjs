import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesSchema } from './schemas/message.schema';
import {MessageController} from "./message.controller";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'message', schema: MessagesSchema }]),
  ],
  providers: [MessageService],
  controllers: [MessageController],

})
export class MessageModule {}
