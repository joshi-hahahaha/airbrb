import React, { useContext } from 'react';
import { ListingHeaderProps } from '../../pages/ListingPage';
import { Typography } from '@mui/material';
import AuthContext from '../../contexts/AuthContext';

export const ListingAmmenities: React.FC<ListingHeaderProps> = ({
  listing,
}) => {
  const { email } = useContext(AuthContext);
  return (
    <div style={{ width: '60%' }}>
      <div>
        <Typography
          variant='h6'
          style={{ fontFamily: 'Samsung-Regular' }}
        >{`${listing.metadata?.propertyType} hosted by ${email}`}</Typography>
        <Typography>{`${listing.metadata?.bedrooms} ${
          listing.metadata?.bedrooms === 1 ? 'bedroom' : 'bedrooms'
        } • ${listing.metadata?.beds} ${
          listing.metadata?.beds === 1 ? 'bed' : 'beds'
        } • ${listing.metadata?.bathrooms} ${
          listing.metadata?.bathrooms === 1 ? 'bathroom' : 'bathrooms'
        }`}</Typography>
      </div>
      <div>
        <Typography variant='h6' style={{ fontFamily: 'Samsung-Regular' }}>
          What this place offers
        </Typography>
      </div>
    </div>
  );
};
