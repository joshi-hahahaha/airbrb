import React, { useState } from 'react';
import {
  formContainer,
  imageFormContainer,
  textFormContainer,
} from '../../styles/addListing/addListingStyle';
import { Button, TextField, Typography } from '@mui/material';

interface NewListingFormData {
  title: string;
  address: string;
  price: number;
  thumbnail: string;
  metadata: object;
}

export const AddListingForm = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const [formData, setFormData] = useState<NewListingFormData>({
    title: '',
    address: '',
    price: 0,
    thumbnail: '',
    metadata: {},
  });

  return (
    <>
      <Typography variant='h5' gutterBottom style={{ marginTop: '40px' }}>
        Create A New Listing
      </Typography>
      <div style={formContainer}>
        <div style={textFormContainer}>
          <form onSubmit={handleSubmit}>
            <TextField
              margin='normal'
              required
              fullWidth
              label='Property title'
              name='property-title'
              type='text'
              value={formData.title}
              onChange={handleChange}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              label='Address'
              name='address'
              type='text'
              value={formData.address}
              onChange={handleChange}
            />
            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
              Create
            </Button>
          </form>
        </div>
        <div style={imageFormContainer}>right div for images</div>
      </div>
    </>
  );
};
