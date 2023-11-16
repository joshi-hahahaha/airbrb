import React, { useContext, useEffect, useState } from 'react';
import { ListingHeaderProps } from '../../pages/ListingPage';
import { Typography } from '@mui/material';
import { ReviewMessage } from './ReviewMessage';
import { ReviewForm } from './ReviewForm';
import { getBookings } from '../../helpers/bookingsApiHelper';
import AuthContext from '../../contexts/AuthContext';

interface ListingBookingSectionProps extends ListingHeaderProps {
  listingId: number;
}

export const ListingBookingSection: React.FC<ListingBookingSectionProps> = ({
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

          console.log(filteredBookings);

          userBooking ? setBookingId(userBooking.id) : setBookingId(0);
        }
      } catch (error) {
        console.log('oh no');
      }
    };
    fetchData();
  }, [listingId]);

  console.log(bookingId);

  /* eslint-disable-next-line multiline-ternary */
  return <>Bookings</>;
};
