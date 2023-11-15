import React from 'react';
import { Typography } from '@mui/material';
import { calcRating } from '../../helpers/reviewsHelper';
import { ListingHeaderProps } from '../../pages/ListingPage';

export const ListingHeader: React.FC<ListingHeaderProps> = ({ listing }) => {
  return (
    <div>
      <div>
        <Typography variant='h4' style={{ fontFamily: 'Samsung-Regular' }}>
          {listing.title}
        </Typography>
      </div>
      <Typography
        variant='h6'
        gutterBottom
      >{`${listing.address.city}, ${listing.address.state}, ${listing.address.country}`}</Typography>
      <Typography>{`★${listing.reviews ? calcRating(listing.reviews) : 0} • ${
        listing.reviews?.length
      } reviews`}</Typography>
    </div>
  );
};
