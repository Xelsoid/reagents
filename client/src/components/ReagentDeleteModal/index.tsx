// @ts-nocheck
import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Button from "@mui/joy/Button";
import { useDeleteReagent } from "../../hooks/useDeleteReagent";

const ReagentDeleteModal = ({ isModalShown, closeModal, reagent }: any) => {
  const { name, uuid, amount, unit, id } = reagent;
  const deleteReagent = useDeleteReagent();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDeleteReagent = async () => {
    setIsLoading(true);
    await deleteReagent(uuid);
    setIsLoading(false);
    closeModal();
    window.location.reload(); // need reload the page to update the table
    // it is better reimplement delete call to be able to return deleted reagent
  };

  return (
    <Dialog open={isModalShown} onClose={closeModal}>
      <DialogTitle>Вы действительно хотите удалить реактив?</DialogTitle>

      <DialogContent>
        {id} {name} ({amount}
        {unit})
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Отмена</Button>
        <Button loading={isLoading} onClick={handleDeleteReagent}>
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { ReagentDeleteModal };
