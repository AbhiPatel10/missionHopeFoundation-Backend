

// blog.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<BlogDocument>,
  ) { }

  async create(dto: CreateBlogDto): Promise<Blog> {
    const blog = new this.blogModel({
      ...dto,
      hashtags: dto.hashtags?.map(h => h.toLowerCase().trim()),
    });
    return blog.save();
  }

  async findAll(): Promise<Blog[]> {
    return this.blogModel
      .find({ isDelete: false })
      .populate('author', 'name email') // populate admin basic info
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<Blog> {
    const blog = await this.blogModel
      .findOne({ _id: id, isDelete: false })
      .populate('author', 'name email');
    if (!blog) throw new NotFoundException('Blog not found');
    return blog;
  }

  async update(id: string, dto: UpdateBlogDto): Promise<Blog> {
    const blog = await this.blogModel.findById(id);
    if (!blog || blog.isDelete) throw new NotFoundException('Blog not found');

    Object.assign(blog, {
      ...dto,
      hashtags: dto.hashtags?.map((h) => h.toLowerCase().trim()) ?? blog.hashtags,
    });
    return blog.save();
  }

  async softDelete(id: string): Promise<void> {
    const blog = await this.blogModel.findById(id);
    if (!blog || blog.isDelete) throw new NotFoundException('Blog not found');

    blog.isDelete = true;
    await blog.save();
  }

  async toggleActive(id: string): Promise<Blog> {
    const blog = await this.blogModel.findById(id);
    if (!blog || blog.isDelete) throw new NotFoundException('Blog not found');

    blog.isActive = !blog.isActive;
    return blog.save();
  }
}
