import React from 'react';
import { Typography, Box } from '@mui/material';
import { Booking } from '../../interfaces/bookingsInterfaces';

interface BookingMessageProps {
  booking: Booking;
}

export const BookingMessage: React.FC<BookingMessageProps> = ({ booking }) => {
  console.log(booking);
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
        <div style={{ minWidth: '80px', paddingLeft: '20px' }}>
          <Typography sx={{ textAlign: 'center' }}>{booking.status}</Typography>
        </div>
        <div
          style={{
            flexGrow: 1,
          }}
        >
          <Typography
            sx={{ textAlign: 'center' }}
          >{`${booking.dateRange.startDate} ${booking.dateRange.endDate}`}</Typography>
        </div>
        <div
          style={{
            minWidth: '80px',
          }}
        >
          <Typography
            sx={{ textAlign: 'center', paddingRight: '20px' }}
          >{`$${booking.totalPrice}`}</Typography>
        </div>
      </Box>
    </div>
  );
};
