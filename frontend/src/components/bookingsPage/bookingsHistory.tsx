import React from 'react';
import { BookingsProps } from '../../pages/BookingsPage';

// All accepted/denied bookings
const BookingsHistory: React.FC<BookingsProps> = ({
  bookings,
  listing,
}) => {
  const historyBookings = bookings.filter(
    booking => booking.status === 'accepted' ||
    booking.status === 'denied'
  );
  console.log(listing.id);

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
