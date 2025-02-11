import { useToast } from './useToast';
import { useMutation } from '@tanstack/react-query';
import { logout } from '../api';

export const useUserLogout = (closeModal: () => void) => {
  const toast = useToast();

  return useMutation({
    mutationFn: (): Promise<{ message: string }> => logout(),
    onSuccess: (response: { message: string }) => {
      toast(response.message, 'success', false);
      closeModal();
    },
    onError: (error) => {
      toast(error.message, 'error');
    },
  });
};
