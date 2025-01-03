import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material';
import Button from '@mui/joy/Button';
import { useAddEmployee } from '../../hooks/useAddEmployee';
import { SelectChangeEvent } from '@mui/material/Select';
import { ROLES } from '../../constants';

interface ICloseAddModal {
  isModalShown: boolean;
  closeModal: () => void;
}

const ColleagueAddModal: React.FC<ICloseAddModal> = ({ isModalShown, closeModal }) => {
  const [colleagueFields, setColleagueFields] = useState<{
    name: string;
    password: string;
    role: ROLES;
  }>({
    name: '',
    password: '',
    role: ROLES.USER,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColleagueFields({
      ...colleagueFields,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSelectChange = (e: SelectChangeEvent) => {
    setColleagueFields({
      ...colleagueFields,
      [e.target.name]: e.target.value,
    });
  };

  const addEmployee = useAddEmployee();

  const handleAddEmployee = async () => {
    setIsLoading(true);
    await addEmployee(colleagueFields);
    setIsLoading(false);
    closeModal();
  };

  return (
    <Dialog open={isModalShown} onClose={closeModal}>
      <DialogTitle>Добавить пользователя</DialogTitle>
      <DialogContent>
        <TextField
          value={colleagueFields.name}
          name="name"
          label="Имя пользователя"
          onChange={handleOnChange}
          fullWidth
          margin="dense"
          disabled={isLoading}
        />
        <TextField
          value={colleagueFields.password}
          label="Пароль"
          name="password"
          type="password"
          onChange={handleOnChange}
          fullWidth
          margin="dense"
          disabled={isLoading}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="colleague-role-label">Роль</InputLabel>
          <Select
            labelId="colleague-role-label"
            id="colleague-role"
            name="role"
            value={colleagueFields.role}
            label="Роль"
            onChange={handleOnSelectChange}
            disabled={isLoading}
          >
            <MenuItem value={ROLES.USER}>User</MenuItem>
            <MenuItem value={ROLES.EDITOR}>Editor</MenuItem>
            <MenuItem value={ROLES.ADMIN}>Admin</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button disabled={isLoading} onClick={closeModal}>
          Отмена
        </Button>
        <Button loading={isLoading} onClick={handleAddEmployee}>
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { ColleagueAddModal };
