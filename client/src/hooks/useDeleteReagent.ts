import { useToast } from './useToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IReagent } from '../constants';
import { deleteReagent } from '../api';

export const useDeleteReagent = (closeModal: () => void) => {
  const toast = useToast();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (uuid: string) => deleteReagent(uuid),
    onError: (error) => {
      toast(error.message, 'error');
      closeModal();
    },
    onSuccess: ({ uuid: deletedUuid }) => {
      queryClient.setQueryData(['reagents'], (oldData: IReagent[]) => {
        return oldData ? oldData.filter(({ uuid }) => uuid !== deletedUuid) : oldData;
      });
      toast(`Реагент был удален`, 'success', false);
      closeModal();
    },
  });
};
