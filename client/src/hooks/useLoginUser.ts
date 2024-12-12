import { useCallback } from 'react';
import { useToast } from './useToast';

export const useUserLogin = () => {
  const sendMessage = useToast();

  return useCallback(
    async (userName: string, userPassword: string) => {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: userName, password: userPassword }),
        });

        const data = await response.json();
        const { message } = data;

        if (!response.ok) {
          sendMessage(data.message, 'error');
          return;
        }

        sendMessage(message, 'success', false);
      } catch (error) {
        console.error('Ошибка:', error);

        sendMessage('Произошла ошибка при попытке входа в систему', 'error');
      }
    },
    [sendMessage]
  );
};
