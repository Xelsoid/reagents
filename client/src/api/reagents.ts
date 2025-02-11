import { END_POINT } from './constants';
import { IReagent } from '../constants';

export const getReagents = async () => {
  const response = await fetch(END_POINT.GET_REAGENTS, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('У Вас нет доступа к списку реактивов. Осуществите вход в систему');
    }
    throw new Error('Произошла ошибка при попытке получить список реактивов');
  }
  return response.json();
};

export const addReagent = async (reagent: IReagent) => {
  const response = await fetch(END_POINT.ADD_REAGENT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...reagent, isDeleted: false }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('У Вас нет доступа к списку реактивов. Осуществите вход в систему');
    }
    throw new Error('Произошла ошибка при попытке добавить новый реактив.');
  }

  return response.json();
};

export const deleteReagent = async (uuid: string) => {
  const response = await fetch(END_POINT.DELETE_REAGENT, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uuid }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('У Вас нет прав на удаление реактива');
    }
    throw new Error('Произошла ошибка. Реагент не был удален');
  }

  return response.json();
};

export const updateReagentAmount = async (reagent: { uuid: string; amount: number }) => {
  const { uuid, amount } = reagent;
  const response = await fetch(END_POINT.UPDATE_REAGENT_AMOUNT, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uuid, amount }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('У Вас нет прав на изменение реактива');
    }
    throw new Error('Произошла ошибка. Реагент не был изменен');
  }

  return response.json();
};
