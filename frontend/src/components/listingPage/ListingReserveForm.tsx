import React, { useContext } from 'react';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { ListingHeaderProps } from '../../pages/ListingPage';
import { Box, Button, Typography } from '@mui/material';
import AuthContext from '../../contexts/AuthContext';

// interface DateRange {
//   startDate: Date | null;
//   endDate: Date | null;
// }

export const ListingReserveForm: React.FC<ListingHeaderProps> = ({
  listing,
}) => {
  const { authToken } = useContext(AuthContext);
  console.log(authToken);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  return (
    <div style={{ width: '40%', display: 'flex', justifyContent: 'flex-end' }}>
      <Box sx={{ width: '90%', boxShadow: 3, borderRadius: '25px', p: '15px' }}>
        <div style={{ width: '100%' }}>
          <Typography
            variant='h6'
            style={{ fontFamily: 'Samsung-Regular' }}
            gutterBottom
          >
            {`$${listing.price} per night`}
          </Typography>
        </div>
        <div style={{ width: '100%' }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label='Start Date'
              value={today}
              minDate={today}
              sx={{ width: '100%', my: '10px' }}
            />
            <DatePicker
              label='End Date'
              value={tomorrow}
              minDate={today}
              sx={{ width: '100%', my: '10px' }}
            />
          </LocalizationProvider>
        </div>
        <div style={{ width: '100%', margin: '10px 0' }}>
          <Button variant='contained' fullWidth>
            Make Booking
          </Button>
        </div>
      </Box>
    </div>
  );
};
