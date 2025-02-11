import React from 'react';
import { Dialog, DialogActions, DialogTitle } from '@mui/material';
import Button from '@mui/joy/Button';
import { useUserLogout } from '../../hooks/useLogoutUser';

const LogOutModal: React.FC<{ isModalShown: boolean; closeModal: () => void }> = ({
  isModalShown,
  closeModal,
}) => {
  const { mutate: logout, isPending } = useUserLogout(closeModal);

  const handleLogout = async () => {
    logout();
  };

  return (
    <Dialog open={isModalShown} onClose={closeModal}>
      <DialogTitle>Вы действительно хотите выйти из системы?</DialogTitle>
      <DialogActions>
        <Button disabled={isPending} onClick={closeModal}>
          Отмена
        </Button>
        <Button loading={isPending} onClick={handleLogout}>
          Выйти
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { LogOutModal };
