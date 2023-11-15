import React, { useContext, useState } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { BookingsProps } from '../../pages/BookingsPage';
import { handleBooking } from '../../helpers/bookingsApiHelper';

const BookingsPending: React.FC<BookingsProps> = ({ bookings, listing }) => {
  const { authToken } = useContext(AuthContext);

  // disable buttons useState
  const [disabledButtons, setDisabledButtons] = useState<{ [key: number]: boolean }>({});

  const pendingBookings = bookings.filter(
    bookings => bookings.listingId === listing.id && (bookings.status === 'pending')
  );
  // On this screen, a list of booking requests are provided for the listing they
  // are viewing. For each booking request, the host is able to accept/deny it.

  // useState for rendering accept/deny
  // const [accept, setAccept] = useState<boolean>();

  // handle accept/decline
  const handleRequest = async (bookingId: number, response: string) => {
    try {
      await handleBooking(authToken, bookingId, response);
      setDisabledButtons(prevState => ({ ...prevState, [bookingId]: true }));
    } catch (error) {
      console.log(error);
    }
  };

  return <>
  {pendingBookings.map((pendingBooking) => (
    <div key={pendingBooking.id}>
      {pendingBooking.dateRange.startDate}
      {pendingBooking.dateRange.endDate}
      {pendingBooking.totalPrice}
      <button
        onClick={() => handleRequest(pendingBooking.id, 'accept')}
        disabled={!!disabledButtons[pendingBooking.id]}
      >
        Accept
      </button>
      <button
        onClick={() => handleRequest(pendingBooking.id, 'decline')}
        disabled={!!disabledButtons[pendingBooking.id]}
      >
        Decline
      </button>
    </div>
  ))}
  </>;
}

export default BookingsPending;
