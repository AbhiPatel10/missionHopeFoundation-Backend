import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Volunteer } from './schemas/volunteer.schema';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';

interface ServiceResponse<T> {
    success: boolean;
    message: string;
    data?: T;
}

@Injectable()
export class VolunteerService {
    constructor(
        @InjectModel(Volunteer.name) private volunteerModel: Model<Volunteer>,
    ) { }

    async createVolunteer(createVolunteerDto: CreateVolunteerDto, createdBy: string): Promise<ServiceResponse<Volunteer>> {
        try {
            const newVolunteer = new this.volunteerModel({
                ...createVolunteerDto,
                createdBy
            });
            const savedVolunteer = await newVolunteer.save();

            return {
                success: true,
                message: 'Volunteer created successfully',
                data: savedVolunteer,
            };
        } catch (error) {
            console.log("error while creating volunteer", error);
            throw new InternalServerErrorException(error.message);
        }
    }

    async getAllVolunteers() {

        const volunteers = await this.volunteerModel
            .find({ isActive: true, isDeleted: false }) // filter
            .select('name address bloodGroup birthdate occupation skills createdBy updatedBy') // select specific fields
            .populate('createdBy', 'email')   // populate createdBy with email of Admin
            .populate('updatedBy', 'email')   // populate updatedBy with email of Admin
            .exec();

        return {
            success: true,
            message: 'Volunteers fetched successfully',
            data: volunteers,
        };

    }

    async getVolunteerById(id: string) {
        const volunteer = await this.volunteerModel.findById(id).exec();
        if (!volunteer) {
            throw new NotFoundException('Volunteer not found');
        }
        return {
            success: true,
            message: 'Volunteer fetched successfully',
            data: volunteer,
        };
    }

    async updateVolunteer(id: string, dto: UpdateVolunteerDto) {
        const updatedVolunteer = await this.volunteerModel
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();
        if (!updatedVolunteer) {
            throw new NotFoundException('Volunteer not found');
        }
        return {
            success: true,
            message: 'Volunteer updated successfully',
            data: updatedVolunteer,
        };
    }

    async deleteVolunteer(id: string) {
        const deletedVolunteer = await this.volunteerModel.findByIdAndDelete(id).exec();
        if (!deletedVolunteer) {
            throw new NotFoundException('Volunteer not found');
        }
        return {
            success: true,
            message: 'Volunteer deleted successfully',
            data: deletedVolunteer,
        };
    }
}
