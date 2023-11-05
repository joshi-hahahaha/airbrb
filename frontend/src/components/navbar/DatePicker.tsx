import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
// import {
//   // DateRangePicker,
//   DesktopDateRangePicker,
// } from '@mui/x/react-date-pickers';

export const DatePicker = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const [dateRange, setDateRange] = useState<DateRange<Date>>([null, null]);

  // const handleDateChange = (range: DateRange<Date>) => {
  //   setDateRange(range);
  //   setAnchorEl(null); // Close the menu after selecting dates
  // };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={handleClick}>Select Dates</Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuItem>
          {/* <DesktopDateRangePicker
            startText='Start Date'
            endText='End Date'
            value={dateRange}
            onChange={handleDateChange}
            renderInput={(startProps, endProps) => (
              <>
                <input {...startProps.input} />
                <input {...endProps.input} />
              </>
            )}
          /> */}
        </MenuItem>
      </Menu>
    </div>
  );
};
