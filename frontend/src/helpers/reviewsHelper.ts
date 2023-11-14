import { Review } from '../interfaces/listingInterfaces';

export const calcRating = (reviews: Review[]): number =>
  reviews.reduce((total, review) => total + review.rating, 0) / reviews.length;
