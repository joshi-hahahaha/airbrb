import React from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Backdrop
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import modalStyle from '../styles/modalStyles';

export interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

export const BaseModal: React.FC<BaseModalProps> = ({ open, onClose, title, children }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      components={{ Backdrop }}
      componentsProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Box sx={modalStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='h6' component='h2'>
            {title}
          </Typography>
          <IconButton aria-label='close' onClick={onClose} sx={{ color: (theme) => theme.palette.grey[500] }}>
            <CloseIcon />
          </IconButton>
        </div>
        {children}
      </Box>
    </Modal>
  );
};
