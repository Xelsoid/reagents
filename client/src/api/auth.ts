import { END_POINT } from './constants';
import { ROLES } from '../constants';

interface IAddEmployee {
  name: string;
  password: string;
  role: ROLES;
}

export const register = async ({ name, password, role }: IAddEmployee) => {
  const response = await fetch(END_POINT.REGISTER, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, password, email: 'N/A', role }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('У Вас нет прав на добавление нового пользователя');
    }
    throw new Error('Произошла ошибка. Пользователь не добавлен!');
  }

  return response.json();
};

export const login = async (userName: string, userPassword: string) => {
  const response = await fetch(END_POINT.LOGIN, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: userName, password: userPassword }),
  });

  if (!response.ok) {
    throw new Error('Произошла ошибка при попытке входа в систему');
  }

  return response.json();
};

export const logout = async () => {
  const response = await fetch(END_POINT.LOGOUT, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Не удалось осуществить выход из системы');
  }

  return response.json();
};
