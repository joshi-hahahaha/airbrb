import React, { useContext, useEffect, useState } from 'react';
import { getBookings } from '../../helpers/bookingsApiHelper';
import AuthContext from '../../contexts/AuthContext';
import { Booking } from '../../interfaces/bookingsInterfaces';
import { Typography } from '@mui/material';
import { BookingMessage } from './BookingMessage';

interface ListingBookingSectionProps {
  listingId: number;
}

export const ListingBookingSection: React.FC<ListingBookingSectionProps> = ({
  listingId,
}) => {
  const { authToken, email } = useContext(AuthContext);

  const [bookings, setBookings] = useState<Booking[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBookings(authToken);
        if (data !== undefined) {
          // Get all bookings of this listing
          let filteredBookings = data.bookings.filter(
            (booking) => booking.listingId === String(listingId)
          );

          filteredBookings = filteredBookings.filter(
            (booking) => booking.owner === email
          );

          setBookings(filteredBookings);
        }
      } catch (error) {
        console.log('oh no');
      }
    };
    fetchData();
  }, [listingId]);

  /* eslint-disable-next-line multiline-ternary */
  return bookings.length !== 0 ? (
    <div style={{ width: '100%' }}>
      <Typography
        variant='h6'
        gutterBottom
        sx={{ fontFamily: 'Samsung-Regular' }}
      >
        {`${bookings.length} ${bookings.length === 1 ? 'Booking' : 'Bookings'}`}
      </Typography>
      <div
        style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '20px' }}
      >
        {/* eslint-disable-next-line multiline-ternary */}
        {bookings.map((booking, index) => (
          <BookingMessage key={index} booking={booking} />
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
};
