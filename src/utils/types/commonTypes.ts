import { Request } from "express";

export interface userRequest extends Request {
  user: {
    _id: number,
    email: string,
    role: string
  }
}