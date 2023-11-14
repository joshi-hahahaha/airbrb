import React from 'react';
import { BookingsProps } from '../../pages/BookingsPage';

const BookingsHeader: React.FC<BookingsProps> = ({ bookings, listing }) => {
  return <>
    <h1>{listing.title}</h1>
    {bookings}
    <p>{listing.postedOn}</p>
  </>
};

export default BookingsHeader;
