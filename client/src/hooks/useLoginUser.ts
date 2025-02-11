import { useToast } from './useToast';
import { useMutation } from '@tanstack/react-query';
import { login } from '../api';

export const useUserLogin = (closeModal: () => void) => {
  const toast = useToast();

  return useMutation({
    mutationFn: ({ name, password }: { name: string; password: string }) => login(name, password),
    onSuccess: ({ name }) => {
      toast(`Добро пожаловать ${name}, Вы успешно вошли в систему`, 'success', false);
      closeModal();
    },
    onError: (error) => {
      toast(error.message, 'error');
    },
  });
};
