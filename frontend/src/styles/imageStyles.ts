import { CSSProperties } from 'react';

export const containerStyle: CSSProperties = {
  position: 'relative',
  width: '100%',
  paddingBottom: '49%', // This sets the aspect ratio to make it 2:1
  display: 'flex',
  justifyContent: 'space',
};

export const halfStyle: CSSProperties = {
  position: 'absolute',
  width: '49%',
  height: '100%', // Occupies the full height of the container
};

export const quarterStyle: CSSProperties = {
  width: '49%',
  height: '49%',
};
