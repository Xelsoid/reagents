import {
  getCurrentUser,
  createUser,
  deleteExistingUser,
} from "../repositories/authentication.repository";

export const getUser = async (requestBody: { name: string }) => {
  const { name } = requestBody;
  if (name) {
    const user = await getCurrentUser(name);
    return user;
  }
  return null;
};

export const addUser = (requestBody: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  const { name, email, password, role } = requestBody;
  return createUser(name, email, password, role);
};

export const deleteUser = (requestBody: { name: string }) => {
  const { name } = requestBody;
  return deleteExistingUser(name);
};
