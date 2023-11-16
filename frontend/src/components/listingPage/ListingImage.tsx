import React from 'react';
import { ListingHeaderProps } from '../../pages/ListingPage';
import {
  containerStyle,
  halfStyle,
  quarterStyle,
} from '../../styles/imageStyles';
import { Button } from '@mui/material';
import CollectionsIcon from '@mui/icons-material/Collections';

export const ListingImage: React.FC<
  ListingHeaderProps & { openModal: () => void }
> = ({ listing, openModal }) => {
  const firstFourPhotos = listing.metadata
    ? listing.metadata.photos.slice(0, 4)
    : [];

  // const handleShowPhotos = () => {
  //   console.log('show photos');
  //   openModal;
  // };

  return (
    <div style={containerStyle}>
      <div style={{ ...halfStyle, left: 0 }}>
        <img
          src={listing.thumbnail}
          alt='Thumbnail'
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div
        style={{
          ...halfStyle,
          right: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        {/* Render quarter style divs for the first 4 photos */}
        {firstFourPhotos.map((photo, index) => (
          <div key={index} style={quarterStyle}>
            <img
              src={photo}
              alt={`Photo ${index + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        ))}
        {/* eslint-disable-next-line multiline-ternary */}
        {listing.metadata?.photos.length !== 0 ? (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              padding: '10px',
            }}
          >
            <Button
              variant='contained'
              color='primary'
              style={{ opacity: '0.9' }}
              onClick={openModal}
            >
              <CollectionsIcon />
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
