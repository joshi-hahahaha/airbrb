import React, { useState } from 'react';
import { Modal, Box, Typography, IconButton, Backdrop } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import modalStyle from '../styles/modalStyles';
import { useNavigate } from 'react-router-dom';

export interface BaseAuthModalProps {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  children?: React.ReactNode;
}

export const BaseAuthModal: React.FC<BaseAuthModalProps> = ({
  title,
  children,
}) => {
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(true);
  const handleModalClose = () => {
    setModalOpen(false);
    navigate('/');
  };

  return (
    <Modal
      open={modalOpen}
      onClose={handleModalClose}
      closeAfterTransition
      components={{ Backdrop }}
      componentsProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Box sx={modalStyle}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant='h6' component='h2'>
            {title}
          </Typography>
          <IconButton
            aria-label='close'
            onClick={handleModalClose}
            sx={{ color: (theme) => theme.palette.grey[500] }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        {children}
      </Box>
    </Modal>
  );
};
