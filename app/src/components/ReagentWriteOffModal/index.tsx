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

const ReagentWriteOffModal = ({
  openModal,
  handleCloseModal,
  curReagent,
}: any) => {
  const [amountValue, setAmountValue] = useState(0);
  return (
    <Dialog open={openModal} onClose={handleCloseModal}>
      <DialogTitle>Списание реактива</DialogTitle>
      <DialogContent>
        <Typography variant="h6">{curReagent[0]}</Typography>
        <Typography variant="body1">ID: {curReagent[1]}</Typography>
        <TextField
          label="Объем списания"
          type="number"
          fullWidth
          className="input_volume"
          value={amountValue}
          onChange={(e) => {
            setAmountValue(Number(e.target.value));
          }}
        />
        <Typography variant="body1">Единицы: {curReagent[2]}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>Отмена</Button>
        <Button
          onClick={() => {
            updateReagentAmount(curReagent[4], curReagent[3] - amountValue);
            handleCloseModal();
          }}
        >
          Списать
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { ReagentWriteOffModal };
