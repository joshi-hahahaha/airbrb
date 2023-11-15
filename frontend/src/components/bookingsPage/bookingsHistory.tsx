import React from 'react';
import { BookingsProps } from '../../pages/BookingsPage';

// All accepted/denied bookings
// The booking request history for this listing consisting of all
// booking requests for this listing and their status (accepted/denied)
const BookingsHistory: React.FC<BookingsProps> = ({ bookings, listing }) => {
  const historyBookings = bookings.filter(
    booking => booking.listingId === listing.id && (booking.status === 'accepted' ||
    booking.status === 'denied')
  );

  return <>
  {historyBookings.map((booking) => (
    <div key={booking.id}>
      {booking.dateRange.startDate}
      {booking.dateRange.endDate}
      {booking.status === 'accepted' && (
        <div className="totalPrice">Total Price: {booking.totalPrice}</div>
      )}
      {booking.status}
    </div>
  ))}
  </>
}

export default BookingsHistory;
