import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { apiResponse } from 'src/utils/apiResponse';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) { }

  @Post("createBlog")
  async create(@Body() dto: CreateBlogDto) {
    const blog = await this.blogService.create(dto);
    return apiResponse({ message: 'Blog created successfully!', data: blog });
  }

  @Get()
  async findAll() {
    const blogs = await this.blogService.findAll();
    return apiResponse({ message: 'Blogs fetched successfully!', data: blogs });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const blog = await this.blogService.findOne(id);
    return apiResponse({ message: 'Blog fetched successfully!', data: blog });
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