import React from 'react';
import { ListingHeaderProps } from '../../pages/ListingPage';
import { Divider, Typography } from '@mui/material';
import { AmentityIconText } from '../AmentityIconText';

export const ListingAmmenities: React.FC<ListingHeaderProps> = ({
  listing,
}) => {
  return (
    <div style={{ width: '50%' }}>
      <div>
        <Typography
          variant='h6'
          style={{ fontFamily: 'Samsung-Regular' }}
        >{`${listing.metadata?.propertyType} in ${listing.address.city}, ${listing.address.country}`}</Typography>
        <Typography>{`${listing.metadata?.bedrooms} ${
          listing.metadata?.bedrooms === 1 ? 'bedroom' : 'bedrooms'
        } • ${listing.metadata?.beds} ${
          listing.metadata?.beds === 1 ? 'bed' : 'beds'
        } • ${listing.metadata?.bathrooms} ${
          listing.metadata?.bathrooms === 1 ? 'bathroom' : 'bathrooms'
        }`}</Typography>
      </div>
      <Divider style={{ marginBottom: '10px' }} />
      <div>
        <Typography variant='h6' style={{ fontFamily: 'Samsung-Regular' }}>
          What this place offers
        </Typography>
      </div>
      {/* eslint-disable-next-line multiline-ternary */}
      {listing?.metadata?.amenities && (
        <div>
          {listing.metadata.amenities.map((amenity, index) => (
            <AmentityIconText key={index} amenity={amenity} />
          ))}
        </div>
      )}
    </div>
  );
};
