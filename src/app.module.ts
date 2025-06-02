import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';
import { DatabaseConnection } from './config/database.providers';
import { MailService } from './mail/mail.service';
import { PhonepeModule } from './phonepe/phonepe.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI ?? ""),
    ContactModule,
    PhonepeModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseConnection, MailService],
})
export class AppModule { }
