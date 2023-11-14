import React, { useEffect, useRef, useState } from 'react';
import { ListingHeaderProps } from '../../pages/ListingPage';
import {
  listingImageContainer,
  listingImageListContainer,
  listingThumbnailContainer,
  thumbnail,
} from '../../styles/imageStyles';
import { ImageList, ImageListItem } from '@mui/material';

export const ListingImage: React.FC<ListingHeaderProps> = ({ listing }) => {
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const [thumbnailContainerHeight, setThumbnailContainerHeight] = useState<
    number | null
  >(null);

  useEffect(() => {
    if (thumbnailContainerRef.current) {
      setThumbnailContainerHeight(thumbnailContainerRef.current.clientHeight);
    }
  }, []);

  return (
    <div style={listingImageContainer}>
      <div ref={thumbnailContainerRef} style={listingThumbnailContainer}>
        <img src={listing.thumbnail} alt='Thumbnail' style={thumbnail} />
      </div>
      <div
        style={{
          ...listingImageListContainer,
          height: thumbnailContainerHeight + 'px',
        }}
      >
        <ImageList
          sx={{ width: 500, height: 275, m: 0 }}
          cols={2}
          rowHeight={150}
        >
          {/* eslint-disable-next-line multiline-ternary */}
          {listing.metadata ? (
            listing.metadata.photos.map((photo, index) => (
              <ImageListItem key={index}>
                <img
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  style={{ width: '100%', cursor: 'pointer' }}
                />
                {'hi'}
              </ImageListItem>
            ))
          ) : (
            <>hi</>
          )}
        </ImageList>
      </div>
    </div>
  );
};
