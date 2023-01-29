import React from 'react';
import { Outlet } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import Header from '../components/Header';
import Copyright from '../components/Copyright';
import SnackbarContextProvider from '../hooks/snackbar/useSnackbar';
import { ImageListContextProvider } from '../hooks/useImageList';
import { FontListContextProvider } from '../hooks/useFontList';

export default function Layout() {
  return (
    <>
      <CssBaseline />
      <SnackbarContextProvider>
        <ImageListContextProvider>
          <FontListContextProvider>
            <Header />
            <Outlet />
            <Copyright />
          </FontListContextProvider>
        </ImageListContextProvider>
      </SnackbarContextProvider>
    </>
  );
}
