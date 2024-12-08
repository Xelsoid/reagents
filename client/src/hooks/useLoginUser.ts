import { useCallback } from 'react';
import { useToast } from './useToast';

export const useUserLogin = () => {
  const sendMessage = useToast();

  return useCallback(
    async (name: string, password: string) => {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, password }),
        });

        if (!response.ok) {
          sendMessage('Неверный логин или пароль', 'error');
          return;
        }

        const data = await response.json();

        sendMessage(`Добро пожаловать ${data.name}`, 'success', false);
        return data;
      } catch (error) {
        console.error('Ошибка:', error);

        sendMessage('Произошла ошибка при входе', 'error');
      }
    },
    [sendMessage]
  );
};
