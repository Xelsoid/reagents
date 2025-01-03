import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Button from '@mui/joy/Button';
import { useAddReagent } from '../../hooks/useAddReagent';
import { IReagent } from '../../constants';

const REAGENT_FIELDS = [
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
  data: IReagent[];
  setData: (reagents: IReagent[]) => void;
}

const ReagentAddModal: React.FC<IReagentAddModal> = ({
  isModalShown,
  closeModal,
  data,
  setData,
}) => {
  const [reagentFieldsState, setReagentFieldsState] = useState<{ [key: string]: string }>(
    REAGENT_FIELDS.reduce<{ [key: string]: string }>((acc, reagent) => {
      acc[reagent.fieldName] = '';
      return acc;
    }, {})
  );

  const [isLoading, setIsLoading] = useState(false);

  const addReagent = useAddReagent();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReagentFieldsState({
      ...reagentFieldsState,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnReagentAdd = async () => {
    setIsLoading(true);
    const newReagent = await addReagent(reagentFieldsState);
    if (newReagent && data) {
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
              disabled={isLoading}
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
