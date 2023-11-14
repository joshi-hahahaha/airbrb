import React from 'react';
import { BookingsProps } from '../../pages/BookingsPage';

const BookingsHeader: React.FC<BookingsProps> = ({ bookings }) => {
  return <>{bookings}</>;
};

export default BookingsHeader;
