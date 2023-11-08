import { CSSProperties } from 'react';

export const page: CSSProperties = {
  minHeight: '100vh',
  width: '100vw',
  overflowY: 'auto',
  backgroundColor: 'white', // temporary just to visualise
};

export const contentContainer: CSSProperties = {
  overflowY: 'auto',
  // backgroundColor: 'black',
  minHeight: 'calc(100vh - 80px)',
  marginTop: '80px',
};
