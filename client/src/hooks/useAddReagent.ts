import { useToast } from './useToast';
import { IReagent } from '../constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addReagent } from '../api';

export const useAddReagent = (closeModal: () => void) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reagent: IReagent): Promise<IReagent> => addReagent(reagent),
    onError: (error) => {
      toast(error.message, 'error');
      closeModal();
    },
    onSuccess: (reagent) => {
      queryClient.setQueryData(['reagents'], (oldData: IReagent[]) => {
        return oldData ? [...oldData, reagent] : [reagent];
      });
      toast(`Реактив "${reagent.name}" id(${reagent.id}) добавлен`, 'success', false);
      closeModal();
    },
  });
};
