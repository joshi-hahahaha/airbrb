import { CSSProperties } from 'react';

export const modalStyle = {
  position: 'fixed',
  width: '60vw',
  height: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  outline: 'none',
  boxSizing: 'border-box',
};

export const modalBackdrop: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
