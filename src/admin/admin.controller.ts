import { Controller, Post, Body, Get, Res, HttpStatus } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Response } from 'express';
import { CreateAdminDto } from './DTOs/create-admin.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginAdminDto } from './DTOs/login-admin.dto';


@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post('create')
  @ApiResponse({ status: 201, description: 'Admin created successfully' })
  @ApiResponse({ status: 409, description: 'Admin already exists' })
  async createAdmin(
    @Body() { email, password }: CreateAdminDto,
    @Res() res: Response,
  ) {
    try {
      const admin = await this.adminService.createAdmin(email, password);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: admin.message,
        data: admin.data,
      });
    } catch (error) {
      if (error.status === HttpStatus.CONFLICT) {
        return res.status(HttpStatus.CONFLICT).json({
          statusCode: 409,
          message: error.message,
        });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  }

  @Post('login')
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(
    @Body() { email, password }: LoginAdminDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.adminService.login(
        email,
        password,
      );

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: result.message,
        data: result.data,
      });
    } catch (err) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: 401,
        message: err.message || 'Invalid credentials',
      });
    }
  }
}
