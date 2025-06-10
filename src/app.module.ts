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
import { BlogModule } from './blog/blog.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI ?? ""),
    ContactModule,
    PhonepeModule,
    AdminModule,
    BlogModule,
    CategoryModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseConnection, MailService]
})
export class AppModule { }
