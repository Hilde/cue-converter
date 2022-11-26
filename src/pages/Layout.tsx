import React from 'react';
import { Outlet } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import Header from '../components/Header';
import Copyright from '../components/Copyright';
import SnackbarContextProvider from '../utils/snackbar/useSnackbar';

export default function Layout() {
  return (
    <>
      <CssBaseline />
      <SnackbarContextProvider>
        <Header />
        <Outlet />
        <Copyright />
      </SnackbarContextProvider>
    </>
  );
}
