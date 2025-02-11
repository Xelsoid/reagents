import { useToast } from './useToast';
import { ROLES } from '../constants';
import { register } from '../api';
import { useMutation } from '@tanstack/react-query';

export const useAddEmployee = (closeModal: () => void) => {
  const toast = useToast();

  interface IAddEmployee {
    name: string;
    password: string;
    role: ROLES;
  }

  return useMutation({
    mutationFn: (employee: IAddEmployee) => register(employee),
    onSuccess: (employee) => {
      toast(
        `Пользователь с именем: "${employee.name}" и ролью: "${employee.role}" добавлен`,
        'success',
        false
      );
      closeModal();
    },
    onError: (error) => {
      toast(error.message, 'error');
      closeModal();
    },
  });
};
