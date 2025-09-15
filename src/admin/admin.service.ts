import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from './admin.schema';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ServiceResponse } from 'src/utils/types/commonTypes';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  async createAdmin(email: string, password: string): Promise<ServiceResponse<Admin>> {
    const existingAdmin = await this.adminModel.findOne({ email });
    if (existingAdmin) {
      throw new ConflictException('Admin already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new this.adminModel({ email, password: hashedPassword });
    const savedAdmin = await admin.save();

    return {
      success: true,
      message: 'Admin created successfully',
      data: savedAdmin,
    };
  }

  async findByEmail(email: string): Promise<AdminDocument | null> {
    return this.adminModel.findOne({ email }).exec();
  }

  async login(email: string, password: string): Promise<ServiceResponse<{ access_token: string }>> {
    const admin = await this.findByEmail(email);
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: admin.email, _id: admin._id, role: admin.role };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '24h',
    });

    return {
      success: true,
      message: 'Login successful',
      data: { access_token: token },
    };
  }
}
