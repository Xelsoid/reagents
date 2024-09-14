import { Response, Request, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import {
  addUser,
  getUser,
  deleteUser,
} from "../servises/authentication.service";

config();

interface RequestWithUser extends Request {
  user: {
    user_id: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
  };
}

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await getUser(req.body);
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user.name, email: user.email, role: user.role },
        process.env.TOKEN_KEY!,
        {
          expiresIn: "2h",
        },
      );

      return res.status(200).json({
        token,
        role: user.role,
      });
    }
    return res.status(400).send("Invalid Credentials");
  } catch (e) {
    return next(e);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const existingUser = await getUser(req.body);
    if (existingUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const user = await addUser(req.body);
    return res.status(200).send({
      data: { user },
    });
  } catch (e) {
    return next(e);
  }
};

export const removeUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const wasUserDeleted = await deleteUser(req.body);

    if (wasUserDeleted) {
      return res.status(200).send({
        message: "The user was deleted",
      });
    }

    return res.status(404).send({
      message: "The user was not found",
    });
  } catch (e) {
    return next(e);
  }
};

export const verifyToken = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("Token is required");
  }

  const [tokenType, token] = authHeader.split(" ");

  if (tokenType !== "Bearer") {
    return res.status(403).send("Invalid Token");
  }

  try {
    const user = jwt.verify(token, process.env.TOKEN_KEY!);
    req.user = user;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export const isAdmin = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  const currentUser = req.user;

  if (currentUser.role === "admin") {
    return next();
  }
  return res
    .status(401)
    .send("You are not authorized do the action (admin role)");
};

export const isEditor = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  const currentUser = req.user;

  if (currentUser.role === "editor" || currentUser.role === "admin") {
    return next();
  }
  return res
    .status(401)
    .send("You are not authorized do the action (editor role)");
};

export const isUser = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  const currentUser = req.user;

  if (
    currentUser.role === "user" ||
    currentUser.role === "editor" ||
    currentUser.role === "admin"
  ) {
    return next();
  }
  return res
    .status(401)
    .send("You are not authorized do the action (user role)");
};
