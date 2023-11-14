import { Review } from '../interfaces/listingInterfaces';

/* eslint-disable indent */
export const calcRating = (reviews: Review[]): number =>
  reviews.length === 0
    ? 0
    : parseFloat(
        (
          reviews.reduce((total, review) => total + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      );
