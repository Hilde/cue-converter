import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Button,
  Divider,
  Link,
  Toolbar,
  Typography,
} from '@mui/material';

export default function Header() {
  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar>
        <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
          <Link underline="none" color="inherit" component={RouterLink} to="/">
            Cue converter
          </Link>
          <Typography component="span" color="inherit">
            : Timestamp converter for rekordbox CUE file
          </Typography>
        </Typography>
        <Divider />
        <Button component={RouterLink} to="/">
          Top
        </Button>
        <Button component={RouterLink} to="/editor">
          Editor
        </Button>
        <Button component={RouterLink} to="/about">
          About
        </Button>
      </Toolbar>
    </AppBar>
  );
}
