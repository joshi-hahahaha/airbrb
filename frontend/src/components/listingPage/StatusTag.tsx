import React from 'react';
import { Typography } from '@mui/material';
import { Status } from '../../interfaces/bookingsInterfaces';

interface StatusTagProps {
  status: Status;
}

export const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  if (status === 'pending') {
    return (
      <Typography
        sx={{
          textAlign: 'left',
          color: '#42a5f5',
          fontFamily: 'Samsung-Regular',
        }}
      >
        Pending
      </Typography>
    );
  } else if (status === 'accepted') {
    return (
      <Typography
        sx={{
          textAlign: 'left',
          color: '#66bb6a',
          fontFamily: 'Samsung-Regular',
        }}
      >
        Accepted
      </Typography>
    );
  } else {
    return (
      <Typography
        sx={{
          textAlign: 'left',
          color: '#d32f2f',
          fontFamily: 'Samsung-Regular',
        }}
      >
        Declined
      </Typography>
    );
  }
};
