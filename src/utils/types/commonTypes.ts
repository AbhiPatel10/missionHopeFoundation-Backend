import { Request } from "express";

export interface userRequest extends Request {
  user: {
    _id: number,
    email: string,
    role: string
  }
}

export interface ServiceResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}