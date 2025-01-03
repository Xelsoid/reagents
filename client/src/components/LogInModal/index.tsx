import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Alert from '@mui/material/Alert';
import Button from '@mui/joy/Button';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useUserLogin } from '../../hooks/useLoginUser';

interface ILogInModal {
  isModalShown: boolean;
  closeModal: () => void;
}

type LogInFieldsState = {
  [key: string]: string | null;
};

const LogInModal: React.FC<ILogInModal> = ({ isModalShown, closeModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [logInFieldsState, setLogInFieldsState] = useState<LogInFieldsState>({
    name: null,
    password: null,
  });
  const [warning, setWarning] = useState<boolean>(false);

  const login = useUserLogin();

  const handleClickShowPassword = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          <Alert severity="warning">Чтобы продолжить введите имя пользователя и пароль</Alert>
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
        <FormControl sx={{ width: '100%' }} variant="outlined" margin="dense">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? 'hide the password' : 'display the password'}
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            name="password"
            label="Пароль"
            disabled={isLoading}
            value={logInFieldsState.password}
            onChange={handleOnChange}
          />
        </FormControl>
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
