import React from 'react';
import { useRouteError } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';

import Header from '../components/Header';
import Copyright from '../components/Copyright';

export default function Error() {
  const error = useRouteError();

  return (
    <>
      <CssBaseline />
      <Header />
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <h1>Something wrong...</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          {/* @ts-ignore TODO */}
          <i>{error.statusText || error.message}</i>
        </p>
      </Container>
      <Copyright />
    </>
  );
}
