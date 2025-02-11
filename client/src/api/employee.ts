import { END_POINT } from './constants';
import { ROLES } from '../constants';

interface IAddEmployee {
  name: string;
  password: string;
  role: ROLES;
}

export const addEmployee = async ({ name, password, role }: IAddEmployee) => {
  const response = await fetch(END_POINT.ADD_EMPLOYEE, {
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
