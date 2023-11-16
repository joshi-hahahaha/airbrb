import { useContext } from 'react';
import { getBookings } from '../helpers/bookingsApiHelper';
import { Booking } from './bookingsInterfaces';
import AuthContext from '../contexts/AuthContext';

/**
 * Get a list of bookings given a listingId
 */
export const getBookingsForListingId = async (
  listingId: number
): Promise<Booking[]> => {
  const { authToken } = useContext(AuthContext);
  const bookings: Booking[] = (await getBookings(authToken)).bookings;

  const filteredBookings = bookings.filter(
    (booking) => booking.listingId === String(listingId)
  );

  console.log(getUserBookingForListing(filteredBookings));

  return filteredBookings;
};

/**
 * Returns bookingId of booking made by user
 */
export const getUserBookingForListing = (
  bookings: Booking[]
): number | null => {
  const { email } = useContext(AuthContext);
  const userBooking = bookings.find((booking) => booking.owner === email);

  return userBooking ? userBooking.id : null;
};
