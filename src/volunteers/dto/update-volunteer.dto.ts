import {
    IsString,
    IsOptional,
    IsArray,
    IsDateString,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateVolunteerDto {
    @ApiPropertyOptional({ example: 'John Doe' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({
        example: '123 Main St, Ahmedabad, Gujarat, 380015',
    })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiPropertyOptional({ example: 'O+' })
    @IsOptional()
    @IsString()
    bloodGroup?: string;

    @ApiPropertyOptional({ example: '1995-06-15' })
    @IsOptional()
    @IsDateString()
    birthdate?: string;

    @ApiPropertyOptional({ example: 'Doctor' })
    @IsOptional()
    @IsString()
    occupation?: string;

    @ApiPropertyOptional({
        example: ['Teaching', 'Fundraising'],
        type: [String],
    })
    @IsOptional()
    @IsArray()
    skills?: string[];
}
