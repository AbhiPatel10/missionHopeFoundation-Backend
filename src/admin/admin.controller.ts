// src/admin/admin.controller.ts
import { Controller, Post, Body, Get, Res, HttpStatus } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Response } from 'express';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post('create')
  async createAdmin(
    @Body('email') email: string, 
    @Body('password') password: string,
    @Res() res: Response,
  ) {
     try {
      const admin = await this.adminService.createAdmin(email, password);
      return res.status(HttpStatus.CREATED).json({
        statusCode: 201,
        message: 'Admin created successfully',
        data: admin,
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

  @Get('all')
  async getAllAdmins() {
    return this.adminService.getAllAdmins();
  }


  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.adminService.login(email, password);
      return res.status(HttpStatus.OK).json({
        statusCode: 200,
        message: 'Login success',
        data: result,
      });
    } catch (err) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: 401,
        message: err.message || 'Invalid credentials',
      });
    }
  }
}
