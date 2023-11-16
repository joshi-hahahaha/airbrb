import React from 'react';
import { ListingHeaderProps } from '../../pages/ListingPage';
import { Typography } from '@mui/material';
import { ReviewMessage } from './ReviewMessage';
import { Review } from '../../interfaces/listingInterfaces';
import { ReviewForm } from './ReviewForm';
// import { getBookingsForListingId } from '../../interfaces/bookingsHelpers';

interface ListingReviewSectionProps extends ListingHeaderProps {
  listingId: number;
}

export const ListingReviewSection: React.FC<ListingReviewSectionProps> = ({
  listing,
  listingId,
}) => {
  // getBookingsForListingId(listingId);
  console.log(listingId);
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
  /* eslint-disable-next-line multiline-ternary */
  return listing ? (
    <div style={{ width: '100%' }}>
      <Typography
        variant='h6'
        gutterBottom
        sx={{ fontFamily: 'Samsung-Regular' }}
      >
        {/* {`${listing.reviews ? listing.reviews?.length : 0} Reviews`} */}
        {`${listing.reviews ? dummyReviews.length : 0} Reviews`}
      </Typography>
      <div
        style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '20px' }}
      >
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
      <ReviewForm listingId={listing.id ? listing.id : 0} />
    </div>
  ) : (
    <></>
  );
};
