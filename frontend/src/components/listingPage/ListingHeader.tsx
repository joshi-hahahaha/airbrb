import React from 'react';
import { Listing } from '../../interfaces/listingInterfaces';
import { Typography } from '@mui/material';
import { calcRating } from '../../helpers/reviewsHelper';

interface ListingHeaderProps {
  listing: Listing;
}

export const ListingHeader: React.FC<ListingHeaderProps> = ({ listing }) => {
  console.log(listing);
  return (
    <div>
      <div>
        <Typography variant='h3'>{listing.title}</Typography>
      </div>
      <Typography
        variant='h6'
        gutterBottom
      >{`${listing.address.city}, ${listing.address.state}, ${listing.address.country}`}</Typography>
      <div>{`★${listing.reviews ? calcRating(listing.reviews) : 0}`}</div>
    </div>
  );
};

/**
 * 1. Title
 * 2. Rating . no. of reviews --- > location
 */
