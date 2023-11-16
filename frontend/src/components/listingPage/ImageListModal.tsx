import React from 'react';
import { Box, Fade, Modal, Typography } from '@mui/material';

interface LiveDatesModalProps {
  open: boolean;
  onClose: () => void;
}

export const ImageListModal: React.FC<LiveDatesModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <div>
      <Modal open={open} onClose={onClose} closeAfterTransition>
        <Fade in={open}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 500,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id='transition-modal-title' variant='h6' component='h2'>
              Text in a modal
            </Typography>
            <Typography id='transition-modal-description' sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
