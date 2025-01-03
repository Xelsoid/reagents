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
import { IReagent } from '../../constants';

interface IReagentWriteOffModal {
  isModalShown: boolean;
  closeModal: () => void;
  reagent: IReagent;
  data: IReagent[];
  setData: (reagents: IReagent[]) => void;
}

const ReagentWriteOffModal: React.FC<IReagentWriteOffModal> = ({
  isModalShown,
  closeModal,
  reagent,
  data,
  setData,
}) => {
  const { name, id, unit, amount, uuid } = reagent;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [amountValue, setAmountValue] = useState<number>(0);

  const handleOnReagentAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountValue(Number(event.target.value));
  };

  const updateReagentAmount = useChangeReagentAmount();

  const handleUpdateReagentAmount = async () => {
    if (!uuid || !amount || amount <= 0 || !data) {
      return;
    }

    setIsLoading(true);
    const updatedReagent = await updateReagentAmount(uuid, amount - amountValue);

    if (updatedReagent) {
      const reagentsCopy = [...data];
      const currentReagent = reagentsCopy.find(
        (currReagent) => updatedReagent.uuid === currReagent.uuid
      );

      if (currentReagent) {
        currentReagent.amount = updatedReagent.amount;
        setData(reagentsCopy);
      }
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
