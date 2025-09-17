import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsArray,
    IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVolunteerDto {
    @ApiProperty({
        description: 'Full name of the volunteer',
        example: 'John Doe',
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Full address including city, state, and postal code',
        example: '123 Main St, Ahmedabad, Gujarat, 380015',
    })
    @IsNotEmpty()
    @IsString()
    address: string;

    @ApiPropertyOptional({
        description: 'Blood group of the volunteer (optional)',
        example: 'O+',
    })
    @IsOptional()
    @IsString()
    bloodGroup?: string;

    @ApiProperty({
        description: 'Date of birth in ISO format (YYYY-MM-DD)',
        example: '1995-06-15',
    })
    @IsNotEmpty()
    @IsDateString()
    birthdate: string;

    @ApiProperty({
        description: 'Occupation of the volunteer',
        example: 'Software Engineer',
    })
    @IsNotEmpty()
    @IsString()
    occupation: string;

    @ApiPropertyOptional({
        description: 'Skills of the volunteer',
        example: ['First Aid', 'Teaching', 'Fundraising'],
        type: [String],
    })
    @IsOptional()
    @IsArray()
    skills?: string[];
}
