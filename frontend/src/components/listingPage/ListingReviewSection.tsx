import React from 'react';
import { ListingHeaderProps } from '../../pages/ListingPage';
import { Typography } from '@mui/material';
import { ReviewMessage } from './ReviewMessage';
import { Review } from '../../interfaces/listingInterfaces';
import { ReviewForm } from './ReviewForm';

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
    {
      rating: 5.0,
      reviewMsg:
        'firsaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaatfirsaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaatfirsaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaatfirsaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaatfirsaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaat',
    },
    { rating: 2.2, reviewMsg: 'secoond' },
    { rating: 3.5, reviewMsg: 'third' },
    { rating: 1.0, reviewMsg: 'first' },
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
        {/* {`${listing.reviews ? listing.reviews?.length : 0} Reviews`} */}
        {`${listing.reviews ? dummyReviews.length : 0} Reviews`}
      </Typography>
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
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
      <ReviewForm />
    </div>
  );
};
