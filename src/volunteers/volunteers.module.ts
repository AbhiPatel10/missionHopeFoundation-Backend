import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VolunteerController } from './volunteers.controller';
import { VolunteerService } from './volunteers.service';
import { Volunteer, VolunteerSchema } from './schemas/volunteer.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Volunteer.name, schema: VolunteerSchema }]),
        AuthModule
    ],
    controllers: [VolunteerController],
    providers: [VolunteerService],
    exports: [VolunteerService]
})
export class VolunteerModule { }
