import bcrypt from "bcryptjs";
import {
  getCurrentUser,
  createUser,
  deleteExistingUser,
} from "../repositories/authentication.repository";

export const getUser = async (requestBody: { name: string }) => {
  const { name } = requestBody;
  if (name) {
    return getCurrentUser(name);
  }
  return null;
};

export const addUser = async (requestBody: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  const { name, email, password } = requestBody;
  const encryptedPassword = await bcrypt.hash(password, 10);
  return createUser(name, email, encryptedPassword, "user");
};

export const deleteUser = (requestBody: { name: string }) => {
  const { name } = requestBody;
  return deleteExistingUser(name);
};
