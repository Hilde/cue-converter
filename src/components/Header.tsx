import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

export default function Header() {
  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar>
        <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
          Cue converter
          <Typography component="span" color="inherit">
            : Timestamp converter for Rekordbox CUE file
          </Typography>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
