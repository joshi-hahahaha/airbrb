import React from 'react';
import { BookingsProps } from '../../pages/BookingsPage';
import { Box, Typography, Paper } from '@mui/material';

// All accepted/denied bookings
const BookingsHistory: React.FC<BookingsProps> = ({
  listingId,
  bookings,
  listing,
}) => {
  const formattedDate = (date: string) => {
    return date.split('T')[0];
  }

  const historyBookings = bookings.filter(
    booking => booking.status === 'accepted' ||
    booking.status === 'denied'
  );
  console.log(listing.title);
  console.log(listingId);
  console.log(historyBookings);
  console.log(bookings);

  return <Paper elevation={3} sx={{ padding: 2, marginY: 3 }}>
  <Typography variant='h6'>Previous bookings</Typography>
  {historyBookings.map((historyBooking) => (
    <div key={historyBooking.id}>
      <Box sx={{ bgcolor: '#fcd8bd', p: 2, marginY: 2, border: 'solid 1px #ffa969' }}
        display='flex' justifyContent='space-between' alignItems='center'
      >
        <Typography variant='body1'>{historyBooking.owner} applied</Typography>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='body1' marginRight={2}>
            From {formattedDate(historyBooking.dateRange.startDate)}
          </Typography>
          <Typography variant='body1' marginRight={2}>
            To {formattedDate(historyBooking.dateRange.endDate)}
          </Typography>
        </Box>
        {historyBooking.status === 'accepted' && (
            <Typography variant='body1'>
              {`You earned: $${historyBooking.totalPrice}`}
            </Typography>
        )}
        <Typography variant='body1'>{historyBooking.status}</Typography>
      </Box>
    </div>
  ))}
  </ Paper>
}

export default BookingsHistory;
