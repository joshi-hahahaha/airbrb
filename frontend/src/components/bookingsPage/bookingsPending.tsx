import React, { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { BookingsProps } from '../../pages/BookingsPage';
import { handleBooking } from '../../helpers/bookingsApiHelper';
import { Paper, Typography, Button, Box } from '@mui/material';

const BookingsPending: React.FC<BookingsProps> = ({
  listingId,
  bookings,
  listing,
  processedBookings,
  setProcessedBookings,
  handleBookingStatusChange
}) => {
  console.log(listing.title);
  console.log(listingId);
  const { authToken } = useContext(AuthContext);

  const formattedDate = (date: string) => {
    return date.split('T')[0];
  }

  const pendingBookings = bookings.filter(
    booking => booking.status === 'pending'
  );
  // On this screen, a list of booking requests are provided for the listing they
  // are viewing. For each booking request, the host is able to accept/deny it.

  // handle accept/decline
  const handleRequest = async (bookingId: number, response: string) => {
    try {
      const newStatus = response === 'accept' ? 'accepted' : 'denied';
      await handleBooking(authToken, bookingId, response);
      setProcessedBookings((prevState: number[]) => [...prevState, bookingId]);
      handleBookingStatusChange(bookingId, newStatus);
    } catch (error) {
      console.log(error);
    }
  };

  return <>
  {pendingBookings.map((pendingBooking) => {
    if (processedBookings.includes(pendingBooking.id)) {
      return null; // delete the processed bookings
    }
    return (
      <div key={pendingBooking.id}>
        <Paper elevation={3} sx={{ padding: 2, marginY: 3 }}>
          <Typography variant='h6'>{pendingBooking.owner} wants a stay</Typography>
          <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
              <Typography variant='body1' marginRight={2}>
                From {formattedDate(pendingBooking.dateRange.startDate)}
              </Typography>
              <Typography variant='body1' marginRight={2}>
                To {formattedDate(pendingBooking.dateRange.endDate)}
              </Typography>
              <Typography variant='body1'>
                {`You'll make: $${pendingBooking.totalPrice} in total.`}
              </Typography>
            </Box>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
              <Button
                variant='contained'
                color='primary'
                onClick={() => handleRequest(pendingBooking.id, 'accept')}
                sx={{ marginRight: 1 }}
              >
                Accept
              </Button>
              <Button
                variant='outlined'
                color='secondary'
                onClick={() => handleRequest(pendingBooking.id, 'decline')}
              >
                Decline
              </Button>
            </Box>
          </Box>
        </Paper>
      </div>
    );
  })}
  </>;
}

export default BookingsPending;
