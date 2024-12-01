// @ts-nocheck
import React from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { logout } from "../../helpers/logout";

const LogOutModal = ({ isModalShown, closeModal }: any) => {
  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };
  return (
    <Dialog open={isModalShown} onClose={closeModal}>
      <DialogTitle>Вы действительно хотите выйти из системы?</DialogTitle>
      <DialogActions>
        <Button onClick={closeModal}>Отмена</Button>
        <Button onClick={handleLogout}>Выйти</Button>
      </DialogActions>
    </Dialog>
  );
};

export { LogOutModal };
