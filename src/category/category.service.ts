import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './category.schema';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiResponse, apiResponse } from 'src/utils/apiResponse';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) { }

  async create(dto: CreateCategoryDto): Promise<ApiResponse<Category>> {
    // Case-insensitive duplicate check and not soft-deleted
    const existing = await this.categoryModel.findOne({
      name: { $regex: new RegExp(`^${dto.name}$`, 'i') },
      isDelete: false,
    });

    if (existing) {
      throw new BadRequestException(`Category '${dto.name}' already exists`);
    }

    const category = new this.categoryModel(dto);
    await category.save();
    return apiResponse({
      message: "Category created successfully!",
      data: category,
      status: 200
    })
  }

  async findAll(): Promise<ApiResponse<Category[]>> {
    const result = await this.categoryModel.find({ isDelete: false }).select('_id name').exec();

    return apiResponse({
      data: result,
      message: "All categories fetched successfully!",
      status: 200
    })
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryModel.findOne({ _id: id, isDelete: false }).exec();
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<Category> {
    const updated = await this.categoryModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!updated) throw new NotFoundException('Category not found');
    return updated;
  }

  async remove(id: string): Promise<void> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category || category.isDelete) throw new NotFoundException('Category not found');

    category.isDelete = true;
    await category.save();
  }

  async toggleActive(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category || category.isDelete) throw new NotFoundException('Category not found');

    category.isActive = !category.isActive;
    return category.save();
  }
}
