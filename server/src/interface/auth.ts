import { Request } from "express";
import { ROLES } from "../constants";

export interface User {
  user_id: string;
  email: string;
  role: ROLES;
  iat: number;
  exp: number;
}

export interface RequestWithUser extends Request {
  user?: User;
}
