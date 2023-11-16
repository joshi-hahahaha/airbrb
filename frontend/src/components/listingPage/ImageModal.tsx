import React from 'react';
import { Box, Fade, Modal } from '@mui/material';

interface ImageModalProps {
  open: boolean;
  onClose: () => void;
  photo: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  open,
  onClose,
  photo,
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
              height: '80%',
              width: '80%',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: '10px',
              overflowY: 'auto',
            }}
          >
            <img src={photo} loading='lazy' />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
