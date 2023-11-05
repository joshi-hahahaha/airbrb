import React from 'react';
import TextField from '@mui/material/TextField';
import { searchBar } from '../../styles/navbar/searchBarStyles';
import { GuestMenu } from './GuestMenu';
import { DatePicker } from './DatePicker';

export const SearchBar: React.FC = () => {
  return (
    <div style={searchBar}>
      <TextField
        id='standard-basic'
        label='Search destinations'
        variant='standard'
      />
      <GuestMenu />
      <DatePicker />
    </div>
  );
};
