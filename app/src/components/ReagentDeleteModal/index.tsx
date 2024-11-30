// @ts-nocheck
import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { deleteReagent } from "../../helpers/deleteReagent";

const ReagentDeleteModal = ({ openModal, closeModal, reagent }: any) => {
  const { name, uuid, amount, unit, id } = reagent;
  return (
    <Dialog open={openModal} onClose={closeModal}>
      <DialogTitle>Вы действительно хотите удалить реактив?</DialogTitle>

      <DialogContent>
        {id} {name} ({amount}
        {unit})
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Отмена</Button>
        <Button
          onClick={() => {
            deleteReagent(uuid);
            window.location.reload();
          }}
        >
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { ReagentDeleteModal };
