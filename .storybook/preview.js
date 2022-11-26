import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import SnackbarContextProvider from '../src/utils/snackbar/useSnackbar';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => {
    return (
      <>
        <CssBaseline />
        <SnackbarContextProvider>
          <MemoryRouter>
            <Routes>
              <Route path="/" element={<Story />} />
            </Routes>
          </MemoryRouter>
        </SnackbarContextProvider>
      </>
    );
  },
];
