// @ts-nocheck
import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import Button from "@mui/joy/Button";
import { useUserLogin } from "../../hooks/useLoginUser";
import { setCustomerDataToStorage } from "../../helpers/manageCustomerDataStorage";

const LogInModal = ({ isModalShown, closeModal }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [logInFieldsState, setLogInFieldsState] = useState({
    userName: null,
    password: null,
  });
  const [warning, setWarning] = useState(false);

  const login = useUserLogin();

  const handleOnChange = (event) => {
    setLogInFieldsState({
      ...logInFieldsState,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogIn = async () => {
    const { userName, password } = logInFieldsState;
    if (userName && password) {
      setIsLoading(true);
      const data = await login(userName, password);
      setCustomerDataToStorage(data.name, data.role);
      setIsLoading(false);
      closeModal();
    } else {
      setWarning(true);
    }
  };

  return (
    <Dialog open={isModalShown} onClose={closeModal}>
      <DialogTitle>
        Добро пожаловать, введите Ваши учетные данные, чтобы войти в систему.
      </DialogTitle>

      <DialogContent>
        {warning && (
          <Alert severity="warning">
            Чтобы продолжить введите имя пользователя и пароль
          </Alert>
        )}
        <TextField
          name="name"
          label="Имя"
          fullWidth
          value={logInFieldsState.name}
          onChange={handleOnChange}
          margin="dense"
          disabled={isLoading}
        />
        <TextField
          name="password"
          label="Пароль"
          fullWidth
          value={logInFieldsState.password}
          onChange={handleOnChange}
          margin="dense"
          disabled={isLoading}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={isLoading} onClick={closeModal}>
          Отмена
        </Button>
        <Button loading={isLoading} onClick={handleLogIn}>
          Войти
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { LogInModal };
