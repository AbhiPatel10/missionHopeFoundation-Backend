// dto/create-admin.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateAdminDto {
    @ApiProperty({
        example: 'admin@example.com',
        description: 'Email address of the admin',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'StrongPass123',
        description: 'Password for the admin (min 6 characters)',
        minLength: 6,
    })
    @IsString()
    @MinLength(6)
    password: string;
}
