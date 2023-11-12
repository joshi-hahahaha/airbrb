import { CSSProperties } from 'react';

export const page: CSSProperties = {
  minHeight: '100vh',
  width: '100vw',
  overflowY: 'auto',
  backgroundColor: 'white', // temporary just to visualise
};

export const contentContainer: CSSProperties = {
  overflowY: 'auto',
  height: 'calc(100vh - 80px)',
  marginTop: '80px',
  padding: '0 80px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const listingContainer: CSSProperties = {
  width: '80%',
  height: '100%',
  flex: '1',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  // justifyContent: 'space-around',
  // alignItems: 'space-around',
};
