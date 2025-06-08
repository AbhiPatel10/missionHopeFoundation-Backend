import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Admin } from 'src/admin/admin.schema';

export type BlogDocument = Blog & Document;

@Schema({ timestamps: true })
export class Blog {
  @Prop({ required: true })
  title: string;

  @Prop()
  mainImage?: string;

  @Prop({ required: true })
  content: string;

  // 👇 reference to Admin collection (who created the blog)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true })
  author: Types.ObjectId | Admin;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isDelete: boolean;

  @Prop({ type: [String], default: [] })
  hashtags: string[];
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
