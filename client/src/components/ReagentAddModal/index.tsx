// @ts-nocheck
import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Button from "@mui/joy/Button";
import { useAddReagent } from "../../hooks/useAddReagent";

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

const ReagentAddModal = ({ isModalShown, closeModal, data, setData }: any) => {
  const [reagentFieldsState, setReagentFieldsState] = useState(
    REAGENT_FIELDS.reduce((acc, reagent) => {
      acc[reagent.fieldName] = "";
      return acc;
    }, {}),
  );

  const [isLoading, setIsLoading] = useState(false);

  const addReagent = useAddReagent();

  const handleOnChange = (event) => {
    setReagentFieldsState({
      ...reagentFieldsState,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnReagentAdd = async () => {
    setIsLoading(true);
    const newReagent = await addReagent(reagentFieldsState);
    if (newReagent) {
      setData([...data, newReagent]);
    }
    setIsLoading(false);
    closeModal();
  };

  return (
    <Dialog open={isModalShown} onClose={closeModal}>
      <DialogTitle>Добавить реактив</DialogTitle>

      <DialogContent>
        {REAGENT_FIELDS.map(({ fieldName, label }) => {
          return (
            <TextField
              key={fieldName}
              name={fieldName}
              label={label}
              fullWidth
              onChange={handleOnChange}
              margin="dense"
            />
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button disabled={isLoading} onClick={closeModal}>
          Отмена
        </Button>
        <Button loading={isLoading} onClick={handleOnReagentAdd}>
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { ReagentAddModal };
