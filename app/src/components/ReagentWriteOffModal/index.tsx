// @ts-nocheck
import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/joy/Button";
import { useChangeReagentAmount } from "../../hooks/useChangeReagentAmount";

const ReagentWriteOffModal = ({ isModalShown, closeModal, reagent }: any) => {
  const { name, id, unit, amount, uuid } = reagent;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnReagentAmountChange = (e) => {
    setAmountValue(Number(e.target.value));
  };

  const updateReagentAmount = useChangeReagentAmount();

  const handleUpdateReagentAmount = async () => {
    setIsLoading(true);
    await updateReagentAmount(uuid, normalizeFloatNumber(amount) - amountValue);
    setIsLoading(false);
    closeModal();
    window.location.reload(); // need reload the page to update the table
  };

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
          onChange={handleOnReagentAmountChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Отмена</Button>
        <Button loading={isLoading} onClick={handleUpdateReagentAmount}>
          Списать
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { ReagentWriteOffModal };
