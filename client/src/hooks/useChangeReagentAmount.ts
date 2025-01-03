import { useCallback } from 'react';
import { useToast } from './useToast';
import { IReagent } from '../constants';

export const useChangeReagentAmount = () => {
  const sendMessage = useToast();

  return useCallback(
    async (uuid: string, amount: number) => {
      try {
        const response = await fetch('/api/updateReagentAmount', {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uuid, amount }),
        });

        if (!response.ok) {
          if (response.status === 401) {
            sendMessage('У Вас нет прав на изменение реактива', 'error');
            return;
          }
          sendMessage('Произошла ошибка. Реагент не был изменен', 'error');
          return;
        }

        const data = await response.json();
        const { reagent } = data.data as {
          reagent: IReagent & { prevAmount: number };
        };

        sendMessage(
          `Количество реагента ${reagent.name} id(${reagent.id}) было изменено с ${reagent.prevAmount} на ${reagent.amount}`,
          'success',
          false
        );

        // TODO: fix return
        // eslint-disable-next-line consistent-return
        return reagent;
      } catch (error) {
        console.error('Ошибка:', error);
        sendMessage('Произошла ошибка при попытке изменить реагент', 'error');
      }
    },
    [sendMessage]
  );
};
