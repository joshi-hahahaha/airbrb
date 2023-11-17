import { CSSProperties } from 'react';

export const navBar: CSSProperties = {
  position: 'fixed',
  top: 0,
  width: 'calc(100vw - 160px)',
  minHeight: '80px',
  backgroundColor: 'white',
  borderBottom: '1px solid #EBEBEB',
  zIndex: 1000,
  padding: '0 80px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap'
};
