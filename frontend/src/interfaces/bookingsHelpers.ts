import { useContext } from 'react';
import { getBookings } from '../helpers/bookingsApiHelper';
import { Booking, BookingsRes } from './bookingsInterfaces';
import AuthContext from '../contexts/AuthContext';

/**
 * Get a list of bookings given a listingId
 */
export const getBookingsForListingId = (listingId: number): Booking[] => {
  const { authToken } = useContext(AuthContext);
  const bookings: Promise<BookingsRes> = getBookings(authToken);

  console.log(bookings);
  console.log(listingId);

  return [];
};
