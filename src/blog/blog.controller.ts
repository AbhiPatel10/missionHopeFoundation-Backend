import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Patch,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { apiResponse } from 'src/utils/apiResponse';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { userRequest } from 'src/utils/types/commonTypes';

@UseGuards(JwtAuthGuard)
@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) { }

  @Post("createBlog")
  async create(
    @Body() dto: CreateBlogDto,
    @Req() req: userRequest,
  ) {
    const blog = await this.blogService.create({ dto, authorId: req?.user?._id });
    return apiResponse({ message: 'Blog created successfully!', data: blog });
  }

  @Get("getBlogs")
  async findAll(
    @Query('limit') limit = '10',
    @Query('offset') offset = '0'
  ) {
    try {

      const limitNum = parseInt(limit, 10);
      const offsetNum = parseInt(offset, 10);
      const blogs = await this.blogService.findAll({ limit: limitNum, offset: offsetNum });

      return apiResponse({
        message: 'Blogs fetched successfully!',
        data: blogs
      });

    } catch (error) {

      console.log("error while fetching blogs");

      return apiResponse({
        message: "Error while fetching blogs",
        status: 500,
        data: null
      });

    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const blog = await this.blogService.findOne(id);

      return apiResponse({
        message: 'Blog fetched successfully!',
        data: blog
      });

    } catch (error) {

      console.log("Error while getting blog details");

      return apiResponse({
        message: "Error while fetched blog details",
        data: null,
        status: 500
      });

    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateBlogDto) {
    const updated = await this.blogService.update(id, dto);
    return apiResponse({ message: 'Blog updated successfully!', data: updated });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.blogService.softDelete(id);
    return apiResponse({ message: 'Blog deleted successfully!', data: {} });
  }

  @Patch(':id/activate')
  async toggleStatus(@Param('id') id: string) {
    const updated = await this.blogService.toggleActive(id);
    return apiResponse({ message: 'Blog status toggled!', data: updated });
  }
}