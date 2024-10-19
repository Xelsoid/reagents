import { Request } from "express";

export interface User {
  user_id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export interface RequestWithUser extends Request {
  user?: User;
}
