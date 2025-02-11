import React from 'react';
import { SnackbarProvider, closeSnackbar } from 'notistack';
import IconButton from '@mui/material/IconButton';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { HomePage } from './page/HomePage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export { App };
