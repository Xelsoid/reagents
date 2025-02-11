import { useEffect } from 'react';
import { useToast } from './useToast';
import { IReagent } from '../constants';
import { useQuery } from '@tanstack/react-query';
import { getReagents } from '../api';

export const useGetReagents = (isAuthenticated: boolean) => {
  const toast = useToast();

  const {
    data: reagents,
    isLoading,
    error,
    isError,
  } = useQuery<IReagent[]>({
    queryFn: () => getReagents(),
    queryKey: ['reagents'],
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (error) {
      toast(error.message, 'error');
    }
  }, [error, toast]);

  return { reagents, isLoading, error, isError };
};
