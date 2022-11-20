import React from 'react';
import { AlertColor } from '@mui/material/Alert';
import { GlobalSnackBar } from './GlobalSnackBar';

export type SnackbarContextType = {
  message: string;

  severity: AlertColor;

  showSnackbar: (message: string, severity: AlertColor) => void;
};

export const SnackbarContext = React.createContext<SnackbarContextType>({
  message: '',
  severity: 'error',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  showSnackbar: (_message: string, _severity: AlertColor) => {
    // eslint-disable-next-line no-console
    console.log(_message);
  }, // dummy method
});

export default function SnackbarContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const context: SnackbarContextType = React.useContext(SnackbarContext);
  const [message, setMessage] = React.useState(context.message);
  const [severity, setSeverity] = React.useState(context.severity);

  const newContext: SnackbarContextType = React.useMemo(
    () => ({
      message,
      severity,
      showSnackbar: (_message: string, _severity: AlertColor) => {
        setMessage(_message);
        setSeverity(_severity);
      },
    }),
    [message, severity, setMessage, setSeverity]
  );

  const handleClose = React.useCallback(() => {
    setMessage('');
  }, [setMessage]);

  return (
    <SnackbarContext.Provider value={newContext}>
      {children}
      <GlobalSnackBar
        open={newContext.message !== ''}
        message={newContext.message}
        severity={newContext.severity}
        onClose={handleClose}
      />
    </SnackbarContext.Provider>
  );
}

export function useSnackbar(): SnackbarContextType {
  return React.useContext(SnackbarContext);
}
