import React from 'react';
import { BookingsProps } from '../../pages/BookingsPage';

const BookingsHeader: React.FC<BookingsProps> = ({ bookings, listing }) => {
  const calculateOnlineDuration = (postedOn: string): string => {
    const start = new Date(postedOn);
    const today = new Date();

    // can be negative values
    let years = today.getFullYear() - start.getFullYear();
    let months = today.getMonth() - start.getMonth();
    let days = today.getDate() - start.getDate();

    // fix the negative values
    if (days < 0) {
      months--;
      // add num of days from last month
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    // less than 1 day rounded up to 1 day
    let result = '';
    if (days < 1) days = 1;
    result += `Been up online for ${days} days`;
    // don't show if less than 1
    if (months >= 1) result += `, ${months} months`;
    if (years >= 1) result += `, ${years} years`;

    return result;
  }

  return <>
    <h1>{listing.title}</h1>
    {bookings}
    {listing.postedOn && (
      <p>{calculateOnlineDuration(listing.postedOn)}</p>
    )}
  </>
};

export default BookingsHeader;
