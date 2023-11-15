import React, { useContext, useState } from 'react';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { ListingHeaderProps } from '../../pages/ListingPage';
import { Box, Button, Typography } from '@mui/material';
import AuthContext from '../../contexts/AuthContext';
import {
  BookingReq,
  makeBookingRequest,
} from '../../helpers/makeBookingHelpers';
import { DateRange } from '../../interfaces/bookingsInterfaces';

interface DateRangeForm {
  startDate: Date | null;
  endDate: Date | null;
}

interface ListingReserveFormProps extends ListingHeaderProps {
  listingId: number;
}

export const ListingReserveForm: React.FC<ListingReserveFormProps> = ({
  listing,
  listingId,
}) => {
  const { authToken } = useContext(AuthContext);
  console.log(listingId);
  console.log(typeof listingId);

  const today = new Date();
  const tomorrow = new Date(today.getDate() + 1);

  const [dateRange, setDateRange] = useState<DateRangeForm>({
    startDate: today,
    endDate: tomorrow,
  });

  const handleDateChange = (
    field: 'startDate' | 'endDate',
    date: Date | null
  ) => {
    const newDateRange = { ...dateRange, [field]: date };
    setDateRange(newDateRange);
  };

  const handleSubmit = () => {
    console.log(dateRange);

    if (dateRange.startDate && dateRange.endDate) {
      const dateRangeObj: DateRange = {
        startDate: dateRange.startDate.toISOString(),
        endDate: dateRange.endDate.toISOString(),
      };
      const bookingReqObj: BookingReq = {
        dateRange: dateRangeObj,
        totalPrice: listing.price,
      };
      makeBookingRequest(authToken, bookingReqObj, listingId);
    }
  };

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
              value={dateRange.startDate}
              minDate={today}
              onChange={(date) => handleDateChange('startDate', date)}
              sx={{ width: '100%', my: '10px' }}
            />
            <DatePicker
              label='End Date'
              value={dateRange.startDate}
              minDate={tomorrow}
              onChange={(date) => handleDateChange('endDate', date)}
              sx={{ width: '100%', my: '10px' }}
            />
          </LocalizationProvider>
        </div>
        <div style={{ width: '100%', margin: '10px 0' }}>
          <Button variant='contained' fullWidth onClick={handleSubmit}>
            Make Booking Request
          </Button>
        </div>
      </Box>
    </div>
  );
};
