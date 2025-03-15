// src/config/database.providers.ts
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class DatabaseConnection implements OnModuleInit {
  private readonly logger = new Logger(DatabaseConnection.name);

  constructor(@InjectConnection() private readonly connection: Connection) {}

  onModuleInit() {
    this.connection.on('connected', () => {
      this.logger.log('✅ MongoDB connected successfully!');
    });

    this.connection.on('error', (err) => {
      this.logger.error(`❌ MongoDB connection error: ${err}`);
    });

    this.connection.on('disconnected', () => {
      this.logger.warn('⚠️ MongoDB disconnected');
    });
  }
}
