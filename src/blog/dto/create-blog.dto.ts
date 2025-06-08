import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsMongoId()
  @IsNotEmpty()
  author: string; // Admin _id reference

  @IsOptional()
  @IsUrl()
  mainImage?: string;

  @IsOptional()
  @IsMongoId()
  category?: string; // Category _id reference

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  hashtags?: string[];
}
