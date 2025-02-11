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
}

const ReagentWriteOffModal: React.FC<IReagentWriteOffModal> = ({
  isModalShown,
  closeModal,
  reagent,
}) => {
  const { name, id, unit, amount, uuid } = reagent;
  const [amountValue, setAmountValue] = useState<number>(0);

  const handleOnReagentAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountValue(Number(event.target.value));
  };

  const { mutate: updateReagentAmount, isPending } = useChangeReagentAmount(closeModal);

  const handleUpdateReagentAmount = async () => {
    if (!uuid || !amount || amount <= 0) {
      return;
    }
    updateReagentAmount({ uuid: uuid, amount: amount - amountValue });
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
          disabled={isPending}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={isPending} onClick={closeModal}>
          Отмена
        </Button>
        <Button loading={isPending} onClick={handleUpdateReagentAmount}>
          Списать
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { ReagentWriteOffModal };
