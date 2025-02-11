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
    const { name, email, role, password } =
      (await getUser(req.body.name)) ?? {};

    if (password && (await bcrypt.compare(req.body.password, password))) {
      // Create token
      const token = jwt.sign(
        { user_id: name, email, role },
        process.env.TOKEN_KEY!,
        { expiresIn: SESSION_EXPIRATION_TIME },
      );

      res.cookie("token", token, {
        httpOnly: true, // Запретить доступ к куки через JavaScript
        secure: process.env.NODE_ENV === "production", // Использовать только по HTTPS в продакшене
        maxAge: SESSION_EXPIRATION_TIME, // Время жизни куки в миллисекундах (2 час)
        sameSite: "strict",
      });

      res.cookie("name", name, {
        secure: process.env.NODE_ENV === "production",
        maxAge: SESSION_EXPIRATION_TIME, // Время жизни куки в миллисекундах (2 час)
        sameSite: "strict",
      });

      res.cookie("role", role, {
        secure: process.env.NODE_ENV === "production",
        maxAge: SESSION_EXPIRATION_TIME, // Время жизни куки в миллисекундах (2 час)
        sameSite: "strict",
      });

      return res.status(200).json({
        token,
        name,
        role,
        message: `Добро пожаловать ${name}, Вы успешно вошли в систему`,
      });
    }
    return res
      .status(401)
      .json({ message: "Неверное имя пользователя или пароль" });
  } catch (e) {
    return next(e);
  }
};

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Удаляем токен из куки
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Использовать только по HTTPS в продакшене
      maxAge: 0, // Устанавливаем время жизни куки в 0, чтобы удалить ее
      sameSite: "strict",
    });

    res.cookie("name", "", {
      secure: process.env.NODE_ENV === "production",
      maxAge: 0, // Время жизни куки в миллисекундах (2 час)
      sameSite: "strict",
    });

    res.cookie("role", "", {
      secure: process.env.NODE_ENV === "production",
      maxAge: 0, // Время жизни куки в миллисекундах (2 час)
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Вы вышли из системы" });
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
      return res.status(409).json({
        message:
          "Пользователь с таким именем уже существует. Пожалуйста осуществите вход",
      });
    }

    const { name, email, role } = await addUser(req.body);
    return res.status(200).send({ name, email, role });
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
      return res.status(200).json({ message: "Пользователь был удален" });
    }

    return res.status(404).json({ message: "Пользователь не был найден" });
  } catch (e) {
    return next(e);
  }
};

export const verifyToken = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  const { token, name, role } = req.cookies;

  if (!token) {
    return res.status(401).json({
      message: "Невозможно выполнить операцию, отсутствуют ключ доступа",
    });
  }

  try {
    const user = jwt.verify(token, process.env.TOKEN_KEY!);
    if (user.user_id === name && user.role === role) {
      req.user = user;
    } else {
      res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Использовать только по HTTPS в продакшене
        maxAge: 0, // Устанавливаем время жизни куки в 0, чтобы удалить ее
        sameSite: "strict",
      });

      res.cookie("name", "", {
        secure: process.env.NODE_ENV === "production",
        maxAge: 0, // Время жизни куки в миллисекундах (2 час)
        sameSite: "strict",
      });

      res.cookie("role", "", {
        secure: process.env.NODE_ENV === "production",
        maxAge: 0, // Время жизни куки в миллисекундах (2 час)
        sameSite: "strict",
      });

      return res.status(403).json({
        message: "Данные учетной записи клиента и сервера не совпадают",
      });
    }
  } catch (err) {
    return res.status(401).json({
      message: "Невозможно выполнить операцию, неверный ключ доступа",
    });
  }
  return next();
};

export const hasRole = (roles: ROLES[]) => {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const currentUser = req.user;

    if (currentUser?.user_id) {
      // getting user from stored data, to prevent the case when the user role was changed in base or user deleted< but session still exists
      const { role } = (await getUser(currentUser.user_id)) ?? {};

      if (roles.includes(role)) {
        return next();
      }
    }

    // console.warn(
    //   `Unauthorized access attempt by user: ${currentUser?.id || "unknown"}`,
    // );
    return res.status(403).json({
      message: `У Вас нет прав доступа для операции. Необходимые роли: ${roles.join(", ")}`,
    });
  };
};
