import { Button, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { ListingHeaderProps } from '../../pages/ListingPage';

export const AdvancedRatingView: React.FC<ListingHeaderProps> = ({
  listing,
}) => {
  console.log(listing);
  const countReviewsForStar = (rating: number): number => {
    if (listing.reviews !== undefined) {
      return listing.reviews.filter((review) => review.rating === rating)
        .length;
    } else {
      return 0;
    }
  };

  const calcReviewPercentage = (rating: number): number => {
    if (listing.reviews !== undefined) {
      const totalReviews = listing.reviews.length;

      const filteredReviews = listing.reviews.filter(
        (review) => review.rating === rating
      ).length;
      return (filteredReviews / totalReviews) * 100;
    } else {
      return 0;
    }
  };

  const renderStarButton = (rating: number): JSX.Element => (
    <Tooltip
      key={rating}
      title={`👁 ${countReviewsForStar(rating)} - ${calcReviewPercentage(
        rating
      ).toFixed(2)}%`}
    >
      <Button>
        <Typography variant='h6'>{`★ ${rating}`}</Typography>
      </Button>
    </Tooltip>
  );

  return (
    <div style={{ width: '100%' }}>{[1, 2, 3, 4, 5].map(renderStarButton)}</div>
  );
};
