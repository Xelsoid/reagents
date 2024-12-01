// @ts-nocheck
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { addReagent } from "../../helpers/addReagent";

const REAGENT_FIELDS: { label: string; fieldsName: string }[] = [
  {
    label: "ID реактива",
    fieldName: "id",
  },
  {
    label: "Наименование реактива",
    fieldName: "name",
  },
  {
    label: "Объем/масса реактива",
    fieldName: "amount",
  },
  {
    label: "Минимальное количество",
    fieldName: "minAmount",
  },
  {
    label: "Единицы измерения",
    fieldName: "unit",
  },
  {
    label: "Поставщик",
    fieldName: "supplier",
  },
  {
    label: "Производитель",
    fieldName: "producer",
  },
  {
    label: "Условия хранения",
    fieldName: "storageConditions",
  },
  {
    label: "Место хранения",
    fieldName: "storagePlace",
  },
];

const ReagentAddModal = ({ isModalShown, closeModal }: any) => {
  const [reagentFieldsState, setReagentFieldsState] = useState(
    REAGENT_FIELDS.reduce((acc, reagent) => {
      acc[reagent.fieldName] = "";
      return acc;
    }, {}),
  );

  const handleOnChange = (event) => {
    setReagentFieldsState({
      ...reagentFieldsState,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Dialog open={isModalShown} onClose={closeModal}>
      <DialogTitle>Добавить реактив</DialogTitle>

      <DialogContent>
        {REAGENT_FIELDS.map((reagent: string) => {
          return (
            <TextField
              key={reagent.fieldName}
              name={reagent.fieldName}
              label={reagent.label}
              fullWidth
              onChange={handleOnChange}
              margin="dense"
            />
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Отмена</Button>
        <Button
          onClick={() => {
            closeModal();
            addReagent(reagentFieldsState);
            window.location.reload();
          }}
        >
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { ReagentAddModal };
