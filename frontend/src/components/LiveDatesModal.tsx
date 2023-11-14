import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useState, useContext } from 'react';
import { Box, Modal, Button, Stack, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { editListing } from '../helpers/listingApiHelpers';
import AuthContext from '../contexts/AuthContext';

interface LiveDatesModalProps {
  open: boolean;
  onClose: () => void;
  listingId: number | undefined;
}

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

const LiveDatesModal: React.FC<LiveDatesModalProps> = ({
  open,
  onClose,
  listingId
}: LiveDatesModalProps) => {
  const { authToken } = useContext(AuthContext);

  const initialDateRanges = [{ startDate: null, endDate: null }];
  // availabilities edit modal
  const [dateRanges, setDateRanges] = useState<DateRange[]>(initialDateRanges);
  const today = new Date();

  const handleDateChange = (index: number, field: 'startDate' | 'endDate', date: Date | null) => {
    const newDateRanges = [...dateRanges];
    newDateRanges[index][field] = date;
    setDateRanges(newDateRanges);
  };

  const handleAddDateRange = () => {
    const newStartDate = calculateMinStartDate();

    setDateRanges([...dateRanges, { startDate: newStartDate, endDate: null }]);
  };

  const handleSubmit = () => {
    const formatDates = dateRanges.map(range => ({
      startDate: range.startDate ? range.startDate.toISOString().split('T')[0] : null,
      endDate: range.endDate ? range.endDate.toISOString().split('T')[0] : null
    }));

    const body = {
      availability: formatDates
    };

    if (typeof listingId === 'undefined') {
      console.error('No listingId');
      return;
    }

    console.log(dateRanges);
    editListing(authToken, listingId, body);
    setDateRanges(initialDateRanges);
    onClose();
  };

  const onCloseAndReset = () => {
    setDateRanges(initialDateRanges);
    onClose();
  };

  // New date range doesn't include dates in previous date ranges
  const calculateMinStartDate = () => {
    let maxEndDate = new Date();

    dateRanges.forEach((range) => {
      if (range.endDate && range.endDate > maxEndDate) {
        maxEndDate = new Date(range.endDate);
      }
    });
    maxEndDate.setDate(maxEndDate.getDate() + 1);

    return maxEndDate;
  };

  return (
    <>
      <Modal open={open} onClose={onCloseAndReset}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            {dateRanges.map((range, index) => (
              <Stack key={index} spacing={2} sx={{ mb: 2 }}>
                <Typography variant="subtitle1">Available Dates {index + 1}</Typography>
                <div>
                  <DatePicker
                    label="Start Date"
                    value={range.startDate}
                    onChange={(date) => handleDateChange(index, 'startDate', date)}
                    minDate={today}
                  />
                  <DatePicker
                    label="End Date"
                    value={range.endDate}
                    onChange={(date) => handleDateChange(index, 'endDate', date)}
                    minDate={range.startDate || undefined}
                  />
                </div>
              </Stack>
            ))}
          </LocalizationProvider>
          {dateRanges.length < 3 && (
          <IconButton onClick={handleAddDateRange} sx={{ mb: 2 }}>
          <AddIcon />
        </IconButton>
          )}
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Add Availabilities
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default LiveDatesModal;
