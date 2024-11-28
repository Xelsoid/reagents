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

const SESSION_EXPIRATION_TIME = 7200000;

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, role, password } = await getUser(req.body.name);

    if (await bcrypt.compare(req.body.password, password)) {
      // Create token
      const token = jwt.sign(
        { user_id: name, email, role },
        process.env.TOKEN_KEY!,
        {
          expiresIn: SESSION_EXPIRATION_TIME,
        },
      );

      res.cookie("token", token, {
        httpOnly: true, // Запретить доступ к куки через JavaScript
        secure: process.env.NODE_ENV === "production", // Использовать только по HTTPS в продакшене
        maxAge: SESSION_EXPIRATION_TIME, // Время жизни куки в миллисекундах (2 час)
      });

      return res.status(200).json({
        token,
        name,
        role,
      });
    }
    return res
      .status(401)
      .header("Content-Type", "text/plain")
      .send("Invalid Credentials");
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
    const existingUser = await getUser(req.body.name);

    if (existingUser) {
      return res
        .status(409)
        .header("Content-Type", "text/plain")
        .send("User Already Exist. Please Login");
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
      return res.status(200).header("Content-Type", "text/plain").send({
        message: "The user was deleted",
      });
    }

    return res.status(404).header("Content-Type", "text/plain").send({
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
  const authCookie = req.cookies.token;
  console.log(req.user);
  if (!authCookie) {
    console.log(1111);
    return res
      .status(401)
      .header("Content-Type", "text/plain")
      .send("Token is required");
  }
  try {
    req.user = jwt.verify(authCookie, process.env.TOKEN_KEY!);
  } catch (err) {
    return res
      .status(401)
      .header("Content-Type", "text/plain")
      .send("Invalid Token");
  }
  return next();
};

export const hasRole = (roles: ROLES[]) => {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    const currentUser = req.user;
    console.log(currentUser);
    if (currentUser && roles.includes(currentUser.role)) {
      return next();
    }

    // console.warn(
    //   `Unauthorized access attempt by user: ${currentUser?.id || "unknown"}`,
    // );
    return res
      .status(403)
      .header("Content-Type", "text/plain")
      .send(
        `You are not authorized to perform this action. Required roles: ${roles.join(", ")}`,
      );
  };
};
