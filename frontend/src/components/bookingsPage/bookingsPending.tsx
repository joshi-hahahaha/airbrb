import React, { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { BookingsProps } from '../../pages/BookingsPage';
import { handleBooking } from '../../helpers/bookingsApiHelper';

const BookingsPending: React.FC<BookingsProps> = ({
  bookings,
  listing,
  processedBookings,
  setProcessedBookings,
  handleBookingStatusChange
}) => {
  console.log(listing.id);
  const { authToken } = useContext(AuthContext);

  const pendingBookings = bookings.filter(
    booking => booking.status === 'pending'
  );
  // On this screen, a list of booking requests are provided for the listing they
  // are viewing. For each booking request, the host is able to accept/deny it.

  // const [accept, setAccept] = useState<boolean>();

  // handle accept/decline
  const handleRequest = async (bookingId: number, response: string) => {
    try {
      const newStatus = response === 'accept' ? 'accepted' : 'denied';
      await handleBooking(authToken, bookingId, response);
      setProcessedBookings((prevState: number[]) => [...prevState, bookingId]);
      handleBookingStatusChange(bookingId, newStatus);
    } catch (error) {
      console.log(error);
    }
  };

  return <>
  {pendingBookings.map((pendingBooking) => {
    if (processedBookings.includes(pendingBooking.id)) {
      return null; // delete the processed bookings
    }
    return (
      <div key={pendingBooking.id}>
        {pendingBooking.dateRange.startDate}
        {pendingBooking.dateRange.endDate}
        {pendingBooking.totalPrice}
        <button
          onClick={() => handleRequest(pendingBooking.id, 'accept')}
        >
          Accept
        </button>
        <button
          onClick={() => handleRequest(pendingBooking.id, 'decline')}
        >
          Decline
        </button>
      </div>
    );
  })}
  </>;
}

export default BookingsPending;
