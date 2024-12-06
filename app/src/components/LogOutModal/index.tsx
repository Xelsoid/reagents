// @ts-nocheck
import React, { useState } from "react";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import Button from "@mui/joy/Button";
import { useForceUpdate } from "../../hooks/useForceUpdate";
import { deleteCustomerDataFromStorage } from "../../helpers/manageCustomerDataStorage";

const LogOutModal = ({ isModalShown, closeModal }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const forceUpdate = useForceUpdate();

  const handleLogout = () => {
    setIsLoading(true);
    deleteCustomerDataFromStorage();
    // BE call
    forceUpdate();
    setIsLoading(false);
    closeModal();
  };

  return (
    <Dialog open={isModalShown} onClose={closeModal}>
      <DialogTitle>Вы действительно хотите выйти из системы?</DialogTitle>
      <DialogActions>
        <Button onClick={closeModal}>Отмена</Button>
        <Button loading={isLoading} onClick={handleLogout}>
          Выйти
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { LogOutModal };
