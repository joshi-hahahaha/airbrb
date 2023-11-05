import { Button, Menu, MenuItem, Slider, Typography } from '@mui/material';
import React, { useState } from 'react';
import { guestSlider } from '../../styles/navbar/guestMenuStyle';

export const GuestMenu: React.FC = () => {
  const [minGuests, setMinGuests] = useState<number>(1);
  const [maxGuests, setMaxGuests] = useState<number>(20);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMinGuestsChange = (event: Event, value: number | number[]) => {
    if (Array.isArray(value)) {
      return;
    }
    setMinGuests(value);
  };

  const handleMaxGuestsChange = (event: Event, value: number | number[]) => {
    if (Array.isArray(value)) {
      return;
    }
    setMaxGuests(value);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={handleClick}>Guests</Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuItem style={guestSlider}>
          <Typography variant='body2' sx={{ fontWeight: 'bold', mr: '5px' }}>
            Min Guests:
          </Typography>
          <Slider
            getAriaLabel={() => 'Minimum guests'}
            value={minGuests}
            onChange={handleMinGuestsChange}
            valueLabelDisplay='auto'
            min={1}
            max={20}
            step={1}
          />
        </MenuItem>
        <MenuItem style={guestSlider}>
          <Typography variant='body2' sx={{ fontWeight: 'bold', mr: '5px' }}>
            Max Guests:
          </Typography>
          <Slider
            getAriaLabel={() => 'Maximum guests'}
            value={maxGuests}
            onChange={handleMaxGuestsChange}
            valueLabelDisplay='auto'
            min={1}
            max={20}
            step={1}
          />
        </MenuItem>
      </Menu>
    </div>
  );
};
