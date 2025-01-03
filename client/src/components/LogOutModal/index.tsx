import React, { useState } from 'react';
import { Dialog, DialogActions, DialogTitle } from '@mui/material';
import Button from '@mui/joy/Button';
import { useUserLogout } from '../../hooks/useLogoutUser';

const LogOutModal: React.FC<{ isModalShown: boolean; closeModal: () => void }> = ({
  isModalShown,
  closeModal,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const logout = useUserLogout();

  const handleLogout = async () => {
    setIsLoading(true);
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
