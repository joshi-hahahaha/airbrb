import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

export type Severity = 'error' | 'warning' | 'info' | 'success';

export interface AlertPopUpProps {
  message: string;
  severity: Severity;
  show: boolean;
}
export const AlertPopUp: React.FC<
  AlertPopUpProps & { onAlertClose: () => void }
> = ({ message, severity, show, onAlertClose }) => {
  const [open, setOpen] = React.useState<boolean>(show);

  React.useEffect(() => {
    setOpen(show);
  }, [show]);

  const handleClose = () => {
    setOpen(false);
    onAlertClose();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={handleClose}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
};
