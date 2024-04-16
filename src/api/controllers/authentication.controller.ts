import { Response, Request, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { getUser } from "../servises/authentication.service";

dotenv.config();

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

      res.status(200).json({
        token,
      });
      return;
    }
    res.status(400).send("Invalid Credentials");
  } catch (e) {
    next(e);
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
  return res.status(401).send("You are not authorized do the action");
};

export const isEditor = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  const currentUser = req.user;

  if (currentUser.role === "editor") {
    return next();
  }
  return res.status(401).send("You are not authorized do the action");
};

export const isUser = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  const currentUser = req.user;

  if (currentUser.role === "user") {
    return next();
  }
  return res.status(401).send("You are not authorized do the action");
};
