import React, { useContext, useEffect, useState } from 'react';
import { ListingHeaderProps } from '../../pages/ListingPage';
import { Divider, Typography } from '@mui/material';
import { ReviewMessage } from './ReviewMessage';
import { ReviewForm } from './ReviewForm';
import { getBookings } from '../../helpers/bookingsApiHelper';
import AuthContext from '../../contexts/AuthContext';
import { AdvancedRatingView } from './AdvancedRatingView';

interface ListingReviewSectionProps extends ListingHeaderProps {
  listingId: number;
}

export const ListingReviewSection: React.FC<ListingReviewSectionProps> = ({
  listing,
  listingId,
}) => {
  const { authToken, email } = useContext(AuthContext);

  const [bookingId, setBookingId] = useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBookings(authToken);
        if (data !== undefined) {
          const filteredBookings = data.bookings.filter(
            (booking) =>
              booking.listingId === String(listingId) &&
              booking.status === 'accepted'
          );

          const userBooking = filteredBookings.find(
            (booking) => booking.owner === email
          );

          userBooking ? setBookingId(userBooking.id) : setBookingId(0);
        }
      } catch (error) {
        console.log('oh no');
      }
    };
    fetchData();
  }, [listingId]);

  /* eslint-disable-next-line multiline-ternary */
  return listing ? (
    <div style={{ width: '100%' }}>
      {/* eslint-disable-next-line multiline-ternary */}
      {(listing.reviews ? listing.reviews?.length : 0) !== 0 ? (
        <Typography
          variant='h6'
          gutterBottom
          sx={{ fontFamily: 'Samsung-Regular' }}
        >
          {/* eslint-disable-next-line multiline-ternary */}
          {`${listing.reviews ? listing.reviews?.length : 0} ${
            (listing.reviews ? listing.reviews?.length : 0) === 1
              ? 'Review'
              : 'Reviews'
          }`}
        </Typography>
      ) : (
        <></>
      )}

      {/* eslint-disable-next-line multiline-ternary */}
      {(listing.reviews ? listing.reviews?.length : 0) !== 0 ? (
        <AdvancedRatingView listing={listing} />
      ) : (
        <></>
      )}

      {/* eslint-disable-next-line multiline-ternary */}
      {(listing.reviews ? listing.reviews?.length : 0) !== 0 ? (
        <Divider sx={{ mb: '20px' }} />
      ) : (
        <></>
      )}

      <div
        style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '20px' }}
      >
        {/* eslint-disable-next-line multiline-ternary */}
        {listing.reviews ? (
          listing.reviews.map((review, index) => (
            <ReviewMessage key={index} review={review} />
          ))
        ) : (
          <></>
        )}
      </div>
      {/* eslint-disable-next-line multiline-ternary */}
      {bookingId !== 0 ? (
        <ReviewForm listingId={listingId} bookingId={bookingId} />
      ) : (
        <></>
      )}
    </div>
  ) : (
    <></>
  );
};
