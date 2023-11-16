import React from 'react';
// import { Typography, Box } from '@mui/material';
import { Booking } from '../../interfaces/bookingsInterfaces';

interface BookingMessageProps {
  booking: Booking;
}

export const BookingMessage: React.FC<BookingMessageProps> = ({ booking }) => {
  console.log(booking);
  return <></>;
  // return (
  //   <div>
  //     <Box
  //       sx={{
  //         boxShadow: 1,
  //         width: '100%',
  //         display: 'flex',
  //         py: '10px',
  //         mb: '20px',
  //         borderRadius: '10px',
  //       }}
  //     >
  //       <div style={{ padding: '0 20px', minWidth: '50px' }}>
  //         <Typography>{`★ ${formattedRating}`}</Typography>
  //       </div>
  //       <div
  //         style={{
  //           width: '100%',
  //           overflow: 'hidden',
  //           textOverflow: 'ellipsis',
  //           paddingRight: '20px',
  //         }}
  //       >
  //         <Typography>{review.reviewMsg}</Typography>
  //       </div>
  //     </Box>
  //   </div>
  // );
};
