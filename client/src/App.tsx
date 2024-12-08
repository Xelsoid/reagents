import React from 'react';
import { SnackbarProvider, closeSnackbar } from 'notistack';
import IconButton from '@mui/material/IconButton';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { HomePage } from './page/HomePage';

function App() {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      hideIconVariant
      action={(snackbarId) => (
        <IconButton
          aria-label="delete"
          size="large"
          title="Закрыть"
          onClick={() => closeSnackbar(snackbarId)}
        >
          <CancelOutlinedIcon />
        </IconButton>
      )}
    >
      <HomePage />
    </SnackbarProvider>
  );
}

export { App };
