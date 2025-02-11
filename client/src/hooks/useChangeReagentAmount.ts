import { useToast } from './useToast';
import { IReagent } from '../constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateReagentAmount } from '../api';

export const useChangeReagentAmount = (closeModal: () => void) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reagent: { uuid: string; amount: number }) => updateReagentAmount(reagent),
    onError: (error) => {
      toast(error.message, 'error');
      closeModal();
    },
    onSuccess: (reagent: IReagent & { prevAmount: number }) => {
      const { name, id, prevAmount, amount } = reagent;
      queryClient.setQueryData(['reagents'], (oldData: IReagent[]) => {
        if (oldData) {
          const data = [...oldData];
          const curReagent = data.find(({ uuid }) => uuid === reagent.uuid);
          if (curReagent) {
            curReagent.amount = amount;
          }
          return data;
        }
        return oldData;
      });
      toast(
        `Количество реагента ${name} id(${id}) было изменено с ${prevAmount} на ${amount}`,
        'success',
        false
      );
      closeModal();
    },
  });
};
