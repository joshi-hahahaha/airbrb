import React from 'react';
import {
  Box,
  Button,
  Fade,
  ImageList,
  ImageListItem,
  Modal,
} from '@mui/material';

interface ImageListModalProps {
  open: boolean;
  onClose: () => void;
  photos: string[] | undefined;
  thumbnail: string | undefined;
}

export const ImageListModal: React.FC<ImageListModalProps> = ({
  open,
  onClose,
  photos,
  thumbnail,
}) => {
  const updatedPhotos = photos ? [thumbnail, ...photos] : [];
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
              width: '60%',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: '10px',
            }}
          >
            <ImageList
              sx={{ width: '100%', height: '100%' }}
              cols={3}
              rowHeight={164}
            >
              {/* eslint-disable-next-line multiline-ternary */}
              {updatedPhotos ? (
                updatedPhotos.map((photo, index) => (
                  <Button key={index}>
                    <ImageListItem key={index}>
                      <img src={photo} loading='lazy' />
                    </ImageListItem>
                  </Button>
                ))
              ) : (
                <>No photos...</>
              )}
            </ImageList>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
