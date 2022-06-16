import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApprenantsModule } from './apprenants/apprenants.module';
import { FormateursModule } from './formateurs/formateurs.module';
import { UsersModule } from './users/users.module';
import { FormationsModule } from './formations/formations.module';

import { RessourcesModule } from './ressources/ressources.module';
import { FilesModule } from './files/files.module';
import { ChapitersModule } from './chapiters/chapiters.module';

import { CategorisModule } from './categoris/categoris.module';
import { NotificationController } from './notification/notification.controller';
import { NotificationService } from './notification/notification.service';
import { NotificationModule } from './notification/notification.module';
import { NotifDetailsController } from './notif-details/notif-details.controller';
import { NotifDetailsService } from './notif-details/notif-details.service';
import { NotifDetailsModule } from './notif-details/notif-details.module';
import { VisioController } from './visio/visio.controller';
import { VisioService } from './visio/visio.service';
import { VisioModule } from './visio/visio.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { MessageController } from './message/message.controller';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/project'),

    FormateursModule,
    ApprenantsModule,
    FormationsModule,
    RessourcesModule,
    FilesModule,
    ChapitersModule,
    CategorisModule,
    NotificationModule,
    NotifDetailsModule,
    VisioModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
