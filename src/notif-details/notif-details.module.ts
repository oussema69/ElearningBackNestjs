import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotifDetailsController } from './notif-details.controller';
import { NotifDetailsService } from './notif-details.service';
import { NotifDetailsSchema } from './schemas/notifDetails.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'notifDetails', schema: NotifDetailsSchema },
    ]),
  ],
  providers: [NotifDetailsService],
  controllers: [NotifDetailsController],
})
export class NotifDetailsModule {}
