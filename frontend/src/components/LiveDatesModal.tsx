import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useState } from 'react';
import {
  Box,
  Modal,
  Button,
} from '@mui/material';

interface LiveDatesModalProps {
  open: boolean;
  onClose: () => void;
}

const LiveDatesModal = ({ open, onClose }: LiveDatesModalProps) => {
  // availabilities edit modal
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleSubmit = () => {
    // 提交日期到后端
    console.log(selectedDate);
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: 'absolute', // 使用绝对定位
            top: '50%', // 垂直居中
            left: '50%', // 水平居中
            transform: 'translate(-50%, -50%)', // 偏移以确保完全居中
            width: 400, // 模态宽度
            bgcolor: 'background.paper', // 背景色
            boxShadow: 24, // 阴影
            p: 4 // 内边距
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={selectedDate}
              onChange={handleDateChange}
              sx={{ mt: 3, mb: 2 }}
            />
          </LocalizationProvider>
          <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default LiveDatesModal;
