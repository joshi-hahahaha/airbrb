import React, { useContext, useEffect, useState } from 'react';
import { ListingHeaderProps } from '../../pages/ListingPage';
import { getBookings } from '../../helpers/bookingsApiHelper';
import AuthContext from '../../contexts/AuthContext';
import { Booking } from '../../interfaces/bookingsInterfaces';

interface ListingBookingSectionProps extends ListingHeaderProps {
  listingId: number;
}

export const ListingBookingSection: React.FC<ListingBookingSectionProps> = ({
  listing,
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

          console.log(filteredBookings);

          setBookings(filteredBookings);
        }
      } catch (error) {
        console.log('oh no');
      }
    };
    fetchData();
  }, [listingId]);

  /* eslint-disable-next-line multiline-ternary */
  console.log(listing);

  useEffect(() => {
    console.log(bookings);
  }, [bookings]);

  return <>Bookings</>;
};
