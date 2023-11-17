import React from 'react';
import { BookingsProps } from '../../pages/BookingsPage';
import { Booking } from '../../interfaces/bookingsInterfaces';
import { Box, Typography } from '@mui/material';

const BookingsHeader: React.FC<BookingsProps> = ({ listingId, bookings, listing }) => {
  // The duration of the listing been online
  const calculatedOnlineDuration = (startDate: string): string => {
    const start = new Date(startDate);
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
    result += `Been up online for ${days} day${days > 1 ? 's' : ''}`;
    // don't show if less than 1
    if (months >= 1) result += `, ${months} months${months > 1 ? 's' : ''}`;
    if (years >= 1) result += `, ${years} years${years > 1 ? 's' : ''}`;

    return result;
  }

  const currentYearBookings = bookings.filter(
    booking => booking.listingId === listingId &&
      new Date(booking.dateRange.startDate).getFullYear() === new Date().getFullYear() &&
      (booking.status === 'accepted' || booking.status === 'denied')
  );

  // How many days this year has the listing been booked for
  const daysThisYear = (bookings: Booking[]): number => {
    let totalDays = 0;

    for (const booking of bookings) {
      if (booking.status === 'accepted') {
        const start = new Date(booking.dateRange.startDate);
        const end = new Date(booking.dateRange.endDate);
        console.log(start);
        console.log(end);
        const difference = Math.round(
          // tranfer into days
          (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
        );

        totalDays += difference;
      }
    }
    console.log(totalDays, 'totalDays');
    return totalDays;
  }

  const days: number = daysThisYear(currentYearBookings);

  // How much profit has this listing made the owner this year
  const profit: number = listing.price * days;

  return <>
    <Typography variant='h3'>{listing.title}</Typography>
    <Box display='inline' justifyContent='space-between' alignItems='center'>
      {listing.postedOn && (
        <Typography variant='h6'>{calculatedOnlineDuration(listing.postedOn)}</Typography>
      )}
      <Typography variant='h6'>{`You've hosted ${days} days this year and made $${profit}`}</Typography>
    </Box>
  </>
};

export default BookingsHeader;
