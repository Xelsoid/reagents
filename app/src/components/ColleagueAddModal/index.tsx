// @ts-nocheck
import React, { useState } from "react";
import {
  Button,
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
import { addUser } from "../../helpers/addUser";

const ColleagueAddModal = ({ isModalShown, closeModal }: any) => {
  const [colleagueFields, setColleagueFields] = useState({
    name: "",
    password: "",
    role: "user",
  });

  const handleOnChange = (e) => {
    setColleagueFields({
      ...colleagueFields,
      [e.target.name]: e.target.value,
    });
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
        />
        <TextField
          value={colleagueFields.password}
          label="Пароль"
          name="password"
          type="password"
          onChange={handleOnChange}
          fullWidth
          margin="dense"
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
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="editor">Editor</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Отмена</Button>
        <Button
          onClick={() => {
            addUser(colleagueFields);
            closeModal();
          }}
        >
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { ColleagueAddModal };
