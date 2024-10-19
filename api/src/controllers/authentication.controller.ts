import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import {
  addUser,
  deleteUser,
  getUser,
} from "../servises/authentication.service";
import { ROLES } from "../constants";
import { RequestWithUser } from "../interface/auth";

config();

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, role, password } = await getUser(req.body);

    if (await bcrypt.compare(req.body.password, password)) {
      // Create token
      const token = jwt.sign(
        { user_id: name, email, role },
        process.env.TOKEN_KEY!,
        {
          expiresIn: "2h",
        },
      );

      return res.status(200).json({
        token,
        role,
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
    req.user = jwt.verify(token, process.env.TOKEN_KEY!);
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

  if (currentUser?.role === ROLES.ADMIN) {
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

  if (currentUser?.role === ROLES.EDITOR || currentUser?.role === ROLES.ADMIN) {
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
    currentUser?.role === ROLES.USER ||
    currentUser?.role === ROLES.EDITOR ||
    currentUser?.role === ROLES.ADMIN
  ) {
    return next();
  }
  return res
    .status(401)
    .send("You are not authorized do the action (user role)");
};
