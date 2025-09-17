import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Volunteer extends Document {
    @Prop()
    name: string;

    @Prop()
    address: string;

    @Prop()
    bloodGroup?: string;

    @Prop()
    birthdate: Date;

    @Prop()
    occupation: string;

    @Prop({ type: [String] })
    skills: string[];

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ default: false })
    isDeleted: boolean;

    @Prop({ type: Types.ObjectId, ref: 'Admin', required: false })
    createdBy?: string;

    /** User/Admin who last updated this record */
    @Prop({ type: Types.ObjectId, ref: 'Admin', required: false })
    updatedBy?: string;
}

export const VolunteerSchema = SchemaFactory.createForClass(Volunteer);
