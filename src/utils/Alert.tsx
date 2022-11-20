import React from 'react';
import MUISnackbar from '@mui/material/Snackbar';
import MUIAlert, { AlertColor } from '@mui/material/Alert';

export type SnackbarProps = {
  open: boolean;
  message: string;
  severity?: AlertColor;
  onClose?: () => void;
  autoHideDuration?: number;
};

export default function Alert({
  open,
  message,
  severity,
  onClose,
  autoHideDuration = 6000,
  ...props
}: SnackbarProps) {
  return (
    <MUISnackbar
      open={open}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      {...props}
    >
      <MUIAlert severity={severity}>{message}</MUIAlert>
    </MUISnackbar>
  );
}
