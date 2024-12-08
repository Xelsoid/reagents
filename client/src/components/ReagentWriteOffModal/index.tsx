// @ts-nocheck
import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import Button from '@mui/joy/Button';
import { useChangeReagentAmount } from '../../hooks/useChangeReagentAmount';

const ReagentWriteOffModal = ({ isModalShown, closeModal, reagent, data, setData }: any) => {
  const { name, id, unit, amount, uuid } = reagent;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [amountValue, setAmountValue] = useState(0);

  const handleOnReagentAmountChange = (e) => {
    setAmountValue(Number(e.target.value));
  };

  const updateReagentAmount = useChangeReagentAmount();

  const handleUpdateReagentAmount = async () => {
    setIsLoading(true);
    const updatedReagent = await updateReagentAmount(uuid, amount - amountValue);

    if (updatedReagent) {
      const reagentsCopy = [...data];
      const currentReagent = reagentsCopy.find(
        (currReagent) => updatedReagent.uuid === currReagent.uuid
      );
      currentReagent.amount = updatedReagent.amount;
      setData(reagentsCopy);
    }

    setIsLoading(false);
    closeModal();
  };

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
          disabled={isLoading}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={isLoading} onClick={closeModal}>
          Отмена
        </Button>
        <Button loading={isLoading} onClick={handleUpdateReagentAmount}>
          Списать
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { ReagentWriteOffModal };
