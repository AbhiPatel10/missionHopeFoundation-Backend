// dto/login-admin.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginAdminDto {
    @ApiProperty({
        example: 'admin@example.com',
        description: 'Email address of the admin',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'StrongPass123',
        description: 'Password of the admin',
        minLength: 6,
    })
    @IsString()
    @MinLength(6)
    password: string;
}
