import React, { useContext, useEffect, useState } from 'react';

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
import { AlertPopUp, AlertPopUpProps, Severity } from '../AlertPopUp';
import { CustomError } from '../../classes/CustomError';

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

  const [alertData, setAlertData] = useState<AlertPopUpProps>({
    show: false,
    message: '',
    severity: 'error',
  });

  const handleAlert = (message: string, severity: Severity, show: boolean) => {
    setAlertData({ message, severity, show });
  };

  const today = new Date();

  const [dateRange, setDateRange] = useState<DateRangeForm>({
    startDate: today,
    endDate: today,
  });

  const handleDateChange = (
    field: 'startDate' | 'endDate',
    date: Date | null
  ) => {
    const newDateRange = { ...dateRange, [field]: date };
    setDateRange(newDateRange);
  };

  const [totalPrice, setTotalPrice] = useState<number>(listing.price);
  const [numNights, setNumNights] = useState<number>(1);
  const calcNights = () => {
    if (dateRange.startDate && dateRange.endDate) {
      const oneDay = 24 * 60 * 60 * 1000;
      const numNights: number = Math.round(
        dateRange.endDate.getTime() / oneDay -
          dateRange.startDate.getTime() / oneDay
      );
      return numNights === 0 ? 1 : numNights;
    }
    return 1;
  };

  useEffect(() => {
    setNumNights(calcNights());
    setTotalPrice(listing.price * calcNights());
  }, [dateRange]);

  const handleSubmit = async () => {
    if (dateRange.startDate && dateRange.endDate) {
      const dateRangeObj: DateRange = {
        startDate: dateRange.startDate.toISOString(),
        endDate: dateRange.endDate.toISOString(),
      };
      // eslint-disable-next-line
      const bookingReqObj: BookingReq = {
        dateRange: dateRangeObj,
        totalPrice: totalPrice,
      };
      try {
        await makeBookingRequest(authToken, bookingReqObj, listingId);
        handleAlert('Your booking request has been made.', 'success', true);
      } catch (error) {
        if (error instanceof CustomError) {
          if (error.message === 'Invalid Token') {
            handleAlert(
              'Please Login or Sign Up to make a booking.',
              'error',
              true
            );
          } else {
            handleAlert(error.message, 'error', true);
          }
        }
      }
    } else if (dateRange.startDate === dateRange.endDate) {
      handleAlert('Start and end dates cannot be the same.', 'error', true);
    }
  };

  return (
    <div style={{ width: '40%', display: 'flex', justifyContent: 'flex-end' }}>
      <Box sx={{ width: '90%', boxShadow: 3, borderRadius: '25px', p: '15px' }}>
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant='h6'
            style={{ fontFamily: 'Samsung-Regular' }}
            gutterBottom
          >
            {`$${totalPrice} for ${numNights}🌙`}
          </Typography>
          <Typography variant='body1' gutterBottom>
            {`($${listing.price}/night)`}
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
              value={dateRange.endDate}
              minDate={
                dateRange.startDate
                  ? new Date(dateRange.startDate.getTime() + 86400000)
                  : today
              }
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
        <AlertPopUp
          message={alertData.message}
          severity={alertData.severity}
          show={alertData.show}
          onAlertClose={() => handleAlert('', 'error', false)}
        />
      </Box>
    </div>
  );
};
