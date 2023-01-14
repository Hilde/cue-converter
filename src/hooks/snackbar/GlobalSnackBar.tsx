import React from 'react';
import MUISnackbar from '@mui/material/Snackbar';
import MUIAlert, { AlertColor, AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MUIAlert elevation={6} ref={ref} variant="filled" {...props} />
));

type Props = {
  open: boolean;

  message: string;

  severity?: AlertColor;

  onClose?: () => void;
};

export function GlobalSnackBar({
  open,
  message,
  severity = 'info',
  onClose,
}: Props) {
  return (
    <MUISnackbar
      open={open}
      onClose={onClose}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert severity={severity}>{message}</Alert>
    </MUISnackbar>
  );
}
