import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Button from '@mui/joy/Button';
import { useAddReagent } from '../../hooks/useAddReagent';
import { IReagent } from '../../constants';

interface IReagentField {
  label: string;
  fieldName: keyof IReagent;
}

const REAGENT_FIELDS: IReagentField[] = [
  {
    label: 'ID реактива',
    fieldName: 'id',
  },
  {
    label: 'Наименование реактива',
    fieldName: 'name',
  },
  {
    label: 'Объем/масса реактива',
    fieldName: 'amount',
  },
  {
    label: 'Минимальное количество',
    fieldName: 'minAmount',
  },
  {
    label: 'Единицы измерения',
    fieldName: 'unit',
  },
  {
    label: 'Поставщик',
    fieldName: 'supplier',
  },
  {
    label: 'Производитель',
    fieldName: 'producer',
  },
  {
    label: 'Условия хранения',
    fieldName: 'storageConditions',
  },
  {
    label: 'Место хранения',
    fieldName: 'storagePlace',
  },
];

interface IReagentAddModal {
  isModalShown: boolean;
  closeModal: () => void;
}

const ReagentAddModal: React.FC<IReagentAddModal> = ({ isModalShown, closeModal }) => {
  const [reagentFieldsState, setReagentFieldsState] = useState<IReagent>(
    REAGENT_FIELDS.reduce((acc, reagent) => {
      const { fieldName } = reagent;
      if (fieldName === 'amount' || fieldName === 'minAmount') {
        acc[fieldName] = 0;
      } else {
        acc[fieldName] = '';
      }
      return acc;
    }, {} as IReagent)
  );

  const { mutate: addReagent, isPending } = useAddReagent(closeModal);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReagentFieldsState({
      ...reagentFieldsState,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnReagentAdd = async () => {
    addReagent(reagentFieldsState);
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
              disabled={isPending}
            />
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button disabled={isPending} onClick={closeModal}>
          Отмена
        </Button>
        <Button loading={isPending} onClick={handleOnReagentAdd}>
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { ReagentAddModal };
