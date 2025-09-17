import {
    Controller,
    Post,
    Body,
    Res,
    HttpStatus,
    Get,
    Patch,
    Param,
    Delete,
    Req,
    UseGuards,
} from '@nestjs/common';
import { VolunteerService } from './volunteers.service';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { Request, Response } from 'express';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Volunteers')
@Controller('volunteers')
export class VolunteerController {
    constructor(private readonly volunteerService: VolunteerService) { }

    @Post('create')
    @ApiOperation({ summary: 'Create Volunteer' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiResponse({ status: 201, description: 'Volunteer created successfully' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    async createVolunteer(
        @Body() createVolunteerDto: CreateVolunteerDto,
        @Res() res: Response,
        @Req() req: Request,
    ) {
        try {
            const createdBy = ""
            const volunteer = await this.volunteerService.createVolunteer(createVolunteerDto, createdBy);
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                message: volunteer.message,
                data: volunteer.data,
            });
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: 500,
                message: error.message || 'Internal server error',
            });
        }
    }

    @Get()
    @ApiResponse({ status: 200, description: 'Get all volunteers' })
    async getAllVolunteers(@Res() res: Response) {
        try {

            const result = await this.volunteerService.getAllVolunteers();
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: result.message,
                data: result.data,
            });

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: 500,
                message: error.message || 'Internal server error',
            });
        }
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'Get volunteer details' })
    @ApiResponse({ status: 404, description: 'Volunteer not found' })
    async getVolunteerById(@Param('id') id: string, @Res() res: Response) {
        const result = await this.volunteerService.getVolunteerById(id);
        return res.status(HttpStatus.OK).json(result);
    }

    @Patch(':id')
    @ApiResponse({ status: 200, description: 'Volunteer updated successfully' })
    @ApiResponse({ status: 404, description: 'Volunteer not found' })
    async updateVolunteer(
        @Param('id') id: string,
        @Body() dto: UpdateVolunteerDto,
        @Res() res: Response,
    ) {
        const result = await this.volunteerService.updateVolunteer(id, dto);
        return res.status(HttpStatus.OK).json(result);
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Volunteer deleted successfully' })
    @ApiResponse({ status: 404, description: 'Volunteer not found' })
    async deleteVolunteer(@Param('id') id: string, @Res() res: Response) {
        const result = await this.volunteerService.deleteVolunteer(id);
        return res.status(HttpStatus.OK).json(result);
    }
}
