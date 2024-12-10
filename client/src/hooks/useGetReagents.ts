import { useCallback } from 'react';
import { useToast } from './useToast';

export const useGetReagents = () => {
  const sendMessage = useToast();

  return useCallback(async () => {
    try {
      const response = await fetch('/api/getReagents', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          sendMessage('У Вас нет доступа к списку реактивов. Осуществите вход в систему', 'error');
          return;
        }
        sendMessage('Произошла ошибка при попытке получить список реактивов', 'error');
        return;
      }

      const data: any = await response.json();
      const { reagents } = data.data;

      // TODO: fix return
      // eslint-disable-next-line consistent-return
      return reagents;
    } catch (error) {
      console.error('Ошибка:', error);
      sendMessage('Произошла ошибка при попытке получить список реактивов', 'error');
    }
  }, [sendMessage]);
};
