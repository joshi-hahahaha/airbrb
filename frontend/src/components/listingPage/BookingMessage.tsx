import React from 'react';
import { Typography, Box } from '@mui/material';
import { Booking } from '../../interfaces/bookingsInterfaces';

interface BookingMessageProps {
  booking: Booking;
}

export const BookingMessage: React.FC<BookingMessageProps> = ({ booking }) => {
  console.log(booking);
  const formatDates = (dateStr: string): string => {
    const date = new Date(dateStr);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;

    const formattedDateString = `${formattedDay}/${formattedMonth}/${year}`;

    return formattedDateString;
  };

  return (
    <div>
      <Box
        sx={{
          boxShadow: 1,
          width: '100%',
          display: 'flex',
          py: '10px',
          mb: '20px',
          borderRadius: '10px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ minWidth: '80px', padding: '0 20px' }}>
          <Typography sx={{ textAlign: 'left' }}>{booking.status}</Typography>
        </div>
        <div
          style={{
            flexGrow: 1,
          }}
        >
          <Typography>{`${formatDates(
            booking.dateRange.startDate
          )} to ${formatDates(booking.dateRange.endDate)}`}</Typography>
        </div>
        <div
          style={{
            minWidth: '80px',
          }}
        >
          <Typography
            sx={{ textAlign: 'right', padding: '0 20px' }}
          >{`$${booking.totalPrice}`}</Typography>
        </div>
      </Box>
    </div>
  );
};
