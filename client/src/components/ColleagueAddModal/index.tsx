// @ts-nocheck
import React, { useState } from "react";
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
} from "@mui/material";
import Button from "@mui/joy/Button";
import { useAddEmployee } from "../../hooks/useAddEmployee";

const ColleagueAddModal = ({ isModalShown, closeModal }: any) => {
  const [colleagueFields, setColleagueFields] = useState({
    name: "",
    password: "",
    role: "user",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnChange = (e) => {
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
            onChange={handleOnChange}
            disabled={isLoading}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="editor">Editor</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
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
