import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useState } from 'react';
import { Box, Modal, Button, Stack, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface LiveDatesModalProps {
  open: boolean;
  onClose: () => void;
}

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

const LiveDatesModal = ({ open, onClose }: LiveDatesModalProps) => {
  // availabilities edit modal
  const [dateRanges, setDateRanges] = useState<DateRange[]>([
    { startDate: null, endDate: null },
  ]);

  const handleDateChange = (index: number, field: 'startDate' | 'endDate', date: Date | null) => {
    const newDateRanges = [...dateRanges];
    newDateRanges[index][field] = date;
    setDateRanges(newDateRanges);
  };

  const handleAddDateRange = () => {
    setDateRanges([...dateRanges, { startDate: null, endDate: null }]);
  };

  const handleSubmit = () => {
    console.log(dateRanges);
    onClose();
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
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
