import React from 'react';
import { Link, Typography } from '@mui/material';

export default function Copyright() {
  return (
    <>
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://hildegynoid.info">
          Hilde Gynoid
        </Link>{' '}
        {new Date().getFullYear()}.
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        <a href="https://github.com/Hilde/cue-converter">Fork on GitHub</a>
      </Typography>
    </>
  );
}
