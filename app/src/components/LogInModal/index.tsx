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
import { useUserLogin } from "../../hooks/useLoginUser";
import Button from "@mui/joy/Button";
import { useSnackbar } from "notistack";
import { useForceUpdate } from "../../hooks/useForceUpdate";

const LogInModal = ({ isModalShown, closeModal }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [logInFieldsState, setLogInFieldsState] = useState<{
    name: string | null;
    password: string | null;
  }>({
    name: null,
    password: null,
  });
  const [warning, setWarning] = useState(false);

  const forceUpdate = useForceUpdate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const login = useUserLogin(enqueueSnackbar);

  const handleOnChange = (event) => {
    setLogInFieldsState({
      ...logInFieldsState,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogIn = async () => {
    const { name, password } = logInFieldsState;
    if (name && password) {
      setIsLoading(true);
      await login(name, password);
      setIsLoading(false);
      closeModal();
      forceUpdate();
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
        />
        <TextField
          name="password"
          label="Пароль"
          fullWidth
          value={logInFieldsState.password}
          onChange={handleOnChange}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Отмена</Button>
        <Button loading={isLoading} onClick={handleLogIn}>
          Войти
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { LogInModal };
