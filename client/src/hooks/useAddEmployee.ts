import { useCallback } from 'react';
import { useToast } from './useToast';

export const useAddEmployee = () => {
  const sendMessage = useToast();

  return useCallback(
    async ({ name, password, role }: any) => {
      try {
        const response = await fetch('/api/create-account', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            password,
            email: 'N/A',
            role,
          }),
        });

        if (!response.ok) {
          if (response.status === 401) {
            sendMessage('У Вас нет прав на добавление нового пользователя', 'error');
            return;
          }
          sendMessage('Произошла ошибка. Пользователь не добавлен!', 'error');
          return;
        }

        const data = await response.json();

        const { user } = data.data;
        sendMessage(
          `Пользователь с именем: "${user.name}" и ролью: "${user.role}" добавлен`,
          'success',
          false
        );

        return data;
      } catch (error) {
        console.error('Ошибка:', error);

        sendMessage('Произошла ошибка при попытке добавить нового пользователя', 'error');
      }
    },
    [sendMessage]
  );
};
