// @ts-nocheck
import React, { useState } from 'react';
import { Dialog, DialogActions, DialogTitle } from '@mui/material';
import Button from '@mui/joy/Button';
import { deleteCustomerDataFromStorage } from '../../helpers/manageCustomerDataStorage';
import { useUserLogout } from '../../hooks/useLogoutUser';

const LogOutModal = ({ isModalShown, closeModal }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const logout = useUserLogout();

  const handleLogout = async () => {
    setIsLoading(true);
    deleteCustomerDataFromStorage();
    await logout();
    setIsLoading(false);
    closeModal();
  };

  return (
    <Dialog open={isModalShown} onClose={closeModal}>
      <DialogTitle>Вы действительно хотите выйти из системы?</DialogTitle>
      <DialogActions>
        <Button disabled={isLoading} onClick={closeModal}>
          Отмена
        </Button>
        <Button loading={isLoading} onClick={handleLogout}>
          Выйти
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { LogOutModal };
