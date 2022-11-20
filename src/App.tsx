import React from 'react';
import { CssBaseline } from '@mui/material';

// import './App.css';
import AppMain from './app/AppMain';
import SnackbarContextProvider from './utils/snackbar/useSnackbar';

function App() {
  return (
    <>
      <CssBaseline />
      <SnackbarContextProvider>
        <AppMain />
      </SnackbarContextProvider>
    </>
  );
}

export default App;
