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

const ReagentDeleteModal = ({
  isModalShown,
  closeModal,
  reagent,
  data,
  setData,
}: any) => {
  const { name, uuid, amount, unit, id } = reagent;
  const deleteReagent = useDeleteReagent();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDeleteReagent = async () => {
    setIsLoading(true);
    const result = await deleteReagent(uuid);

    if (result) {
      const copiedReagents = [...data];
      const indexForDelete = copiedReagents.findIndex(
        (reagent) => reagent.uuid === uuid,
      );
      copiedReagents.splice(indexForDelete, 1);
      setData(copiedReagents);
    }

    setIsLoading(false);
    closeModal();
  };

  return (
    <Dialog open={isModalShown} onClose={closeModal}>
      <DialogTitle>Вы действительно хотите удалить реактив?</DialogTitle>

      <DialogContent>
        {id} {name} ({amount}
        {unit})
      </DialogContent>
      <DialogActions>
        <Button disabled={isLoading} onClick={closeModal}>
          Отмена
        </Button>
        <Button loading={isLoading} onClick={handleDeleteReagent}>
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { ReagentDeleteModal };
