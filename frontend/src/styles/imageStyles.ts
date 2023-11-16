import { CSSProperties } from 'react';

export const containerStyle: CSSProperties = {
  position: 'relative',
  width: '100%',
  paddingBottom: '49%',
  display: 'flex',
  justifyContent: 'space',
  borderRadius: '25px',
  overflow: 'hidden',
  margin: '20px 0',
};

export const halfStyle: CSSProperties = {
  position: 'absolute',
  width: '49%',
  height: '100%',
};

export const quarterStyle: CSSProperties = {
  width: '49%',
  height: '49%',
};
