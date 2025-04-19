import { Module } from '@nestjs/common';
import { PhonepeService } from './phonepe.service';
import { PhonepeController } from './phonepe.controller';

@Module({
  providers: [PhonepeService],
  controllers: [PhonepeController]
})
export class PhonepeModule {}
