import React, { useContext, useEffect, useState } from 'react';
import { ListingHeaderProps } from '../../pages/ListingPage';
import { Typography } from '@mui/material';
import { ReviewMessage } from './ReviewMessage';
// import { Review } from '../../interfaces/listingInterfaces';
import { ReviewForm } from './ReviewForm';
import { Booking } from '../../interfaces/bookingsInterfaces';
import { getBookings } from '../../helpers/bookingsApiHelper';
import AuthContext from '../../contexts/AuthContext';

interface ListingReviewSectionProps extends ListingHeaderProps {
  listingId: number;
}

export const ListingReviewSection: React.FC<ListingReviewSectionProps> = ({
  listing,
  listingId,
}) => {
  // console.log(listingId);
  // getBookingsForListingId(listingId).then((bookings) => {
  //   console.log(bookings);
  //   // console.log(getUserBookingForListing(bookings));
  // });
  // const bookings = getBookingsForListingId(listingId);
  // console.log(bookings);
  // console.log(getUserBookingForListing(bookings));
  const { authToken, email } = useContext(AuthContext);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingId, setBookingId] = useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBookings(authToken);
        if (data !== undefined) {
          const filteredBookings = data.bookings.filter(
            (booking) => booking.listingId === String(listingId)
          );
          console.log(filteredBookings);
          setBookings(filteredBookings);

          const userBooking = filteredBookings.find(
            (booking) => booking.owner === email
          );

          userBooking ? setBookingId(userBooking.id) : setBookingId(0);

          // Move the logging here or use the second useEffect
          console.log(filteredBookings);
          console.log(bookingId);
          // console.log(userBooking.id);
        }
      } catch (error) {
        console.log('oh no');
      }
    };
    fetchData();
  }, [listingId]);

  // Alternatively, use a second useEffect for logging the updated state
  useEffect(() => {
    console.log(bookings);
  }, [bookings]);

  // const dummyReviews: Review[] = [
  //   {
  //     rating: 5.0,
  //     reviewMsg:
  //       'firsaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaatfirsaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaatfirsaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaatfirsaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaatfirsaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaat',
  //   },
  //   { rating: 2.2, reviewMsg: 'secoond' },
  //   { rating: 3.5, reviewMsg: 'third' },
  //   { rating: 1.0, reviewMsg: 'first' },
  //   {
  //     rating: 5.0,
  //     reviewMsg:
  //       'firsaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaatfirsaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaatfirsaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaatfirsaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaatfirsaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaat',
  //   },
  //   { rating: 2.2, reviewMsg: 'secoond' },
  //   { rating: 3.5, reviewMsg: 'third' },
  //   { rating: 1.0, reviewMsg: 'first' },
  //   {
  //     rating: 5.0,
  //     reviewMsg:
  //       'firsaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaatfirsaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaatfirsaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaatfirsaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaatfirsaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaat',
  //   },
  //   { rating: 2.2, reviewMsg: 'secoond' },
  //   { rating: 3.5, reviewMsg: 'third' },
  //   { rating: 1.0, reviewMsg: 'first' },
  // ];
  /* eslint-disable-next-line multiline-ternary */
  return listing ? (
    <div style={{ width: '100%' }}>
      <Typography
        variant='h6'
        gutterBottom
        sx={{ fontFamily: 'Samsung-Regular' }}
      >
        {`${listing.reviews ? listing.reviews?.length : 0} Reviews`}
        {/* {`${listing.reviews ? dummyReviews.length : 0} Reviews`} */}
      </Typography>
      <div
        style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '20px' }}
      >
        {/* eslint-disable-next-line multiline-ternary */}
        {listing.reviews ? (
          listing.reviews.map((review, index) => (
            <ReviewMessage key={index} review={review} />
          ))
        ) : (
          // dummyReviews.map((review, index) => (
          //   <ReviewMessage key={index} review={review} />
          // ))
          <></>
        )}
      </div>
      <ReviewForm listingId={listingId} bookingId={bookingId} />
    </div>
  ) : (
    <></>
  );
};
