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
  {historyBookings.map((historyBooking) => (
    <div key={historyBooking.id}>
      {historyBooking.dateRange.startDate}
      {historyBooking.dateRange.endDate}
      {historyBooking.status === 'accepted' && (
        <div className="totalPrice">Total Price: {historyBooking.totalPrice}</div>
      )}
      {historyBooking.status}
    </div>
  ))}
  </>
}

export default BookingsHistory;
