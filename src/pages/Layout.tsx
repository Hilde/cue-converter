import React from 'react';
import { Outlet } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import Header from '../components/Header';
import Copyright from '../components/Copyright';
import SnackbarContextProvider from '../hooks/snackbar/useSnackbar';
import { ImageListContextProvider } from '../hooks/useImageList';

export default function Layout() {
  return (
    <>
      <CssBaseline />
      <SnackbarContextProvider>
        <ImageListContextProvider>
          <Header />
          <Outlet />
          <Copyright />
        </ImageListContextProvider>
      </SnackbarContextProvider>
    </>
  );
}
