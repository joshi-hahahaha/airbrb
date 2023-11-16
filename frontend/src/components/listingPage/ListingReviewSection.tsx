import React from 'react';
import { ListingHeaderProps } from '../../pages/ListingPage';
import { Typography } from '@mui/material';
import { ReviewMessage } from './ReviewMessage';
import { Review } from '../../interfaces/listingInterfaces';

export const ListingReviewSection: React.FC<ListingHeaderProps> = ({
  listing,
}) => {
  console.log(listing);

  const dummyReviews: Review[] = [
    {
      rating: 5.0,
      reviewMsg:
        'firsaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaatfirsaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaatfirsaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaatfirsaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaatfirsaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaat',
    },
    { rating: 2.2, reviewMsg: 'secoond' },
    { rating: 3.5, reviewMsg: 'third' },
    { rating: 1.0, reviewMsg: 'first' },
  ];
  return (
    <div style={{ width: '100%' }}>
      <Typography
        variant='h6'
        gutterBottom
        sx={{ fontFamily: 'Samsung-Regular' }}
      >
        Reviews
      </Typography>
      <div>
        reviews Container should scroll
        <div>review message + rating - for each and then get review</div>
        {/* eslint-disable-next-line multiline-ternary */}
        {listing.reviews ? (
          // listing.reviews.map((review, index) => (
          //   <ReviewMessage key={index} review={review} />
          // ))
          dummyReviews.map((review, index) => (
            <ReviewMessage key={index} review={review} />
          ))
        ) : (
          <></>
        )}
      </div>
      <div>
        leave review textarea contaitner
        <div>leave review</div>
        <div>
          form
          <div>textarea</div>
          <div>button</div>
        </div>
      </div>
    </div>
  );
};
