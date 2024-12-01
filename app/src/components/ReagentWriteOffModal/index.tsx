// @ts-nocheck
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { updateReagentAmount } from "../../helpers/changeAmountReagent";

const ReagentWriteOffModal = ({ isModalShown, closeModal, reagent }: any) => {
  const { name, id, unit, amount, uuid } = reagent;
  const [amountValue, setAmountValue] = useState(0);
  return (
    <Dialog open={isModalShown} onClose={closeModal}>
      <DialogTitle>Списание реактива</DialogTitle>
      <DialogContent>
        <Typography variant="h6" marginBottom={2}>
          {name} (ID: {id})
        </Typography>
        <TextField
          label={`Объем списания (${unit})`}
          type="number"
          fullWidth
          className="input_volume"
          value={amountValue}
          onChange={(e) => {
            setAmountValue(Number(e.target.value));
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Отмена</Button>
        <Button
          onClick={() => {
            updateReagentAmount(uuid, amount - amountValue);
            closeModal();
          }}
        >
          Списать
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { ReagentWriteOffModal };
