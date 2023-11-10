import React, { useState } from 'react';
import {
  formContainer,
  imageFormContainer,
  textFormContainer,
} from '../../styles/addListing/addListingStyle';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Address,
  Metadata,
  NewListingFormData,
} from '../../interfaces/listingInterfaces';
import { addListing } from '../../helpers/listingApiHelpers';

export const AddListingForm = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body: NewListingFormData = { ...formData };
    console.log(body);

    addListing(body);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressChange = (name: keyof Address, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value,
      },
    }));
  };

  const handleMetadataChange = (
    name: keyof Metadata,
    value: string | number
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      metadata: {
        ...prevData.metadata,
        [name]: value,
      },
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, thumbnail: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const [formData, setFormData] = useState<NewListingFormData>({
    title: '',
    address: {
      street: '',
      city: '',
      state: '',
      postcode: '',
      country: '',
    },
    price: 0,
    thumbnail: '',
    metadata: {
      ammenities: [],
      photos: [],
      propertyType: 'House',
      bedrooms: 0,
      beds: 0,
      bathrooms: 0,
    },
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
              name='title'
              type='text'
              value={formData.title}
              onChange={handleChange}
            />
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <Typography
                  variant='subtitle1'
                  sx={{ color: 'gray' }}
                  gutterBottom
                >
                  Address *
                </Typography>
              </AccordionSummary>
              <Divider />
              <AccordionDetails>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  label='Street'
                  name='street'
                  type='text'
                  value={formData.address.street}
                  onChange={(event) =>
                    handleAddressChange('street', event.target.value)
                  }
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  label='City'
                  name='city'
                  type='text'
                  value={formData.address.city}
                  onChange={(event) =>
                    handleAddressChange('city', event.target.value)
                  }
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  label='State'
                  name='state'
                  type='text'
                  value={formData.address.state}
                  onChange={(event) =>
                    handleAddressChange('state', event.target.value)
                  }
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  label='Postcode'
                  name='postcode'
                  type='text'
                  value={formData.address.postcode}
                  onChange={(event) =>
                    handleAddressChange('postcode', event.target.value)
                  }
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  label='Country'
                  name='country'
                  type='text'
                  value={formData.address.country}
                  onChange={(event) =>
                    handleAddressChange('country', event.target.value)
                  }
                />
              </AccordionDetails>
            </Accordion>
            <TextField
              margin='normal'
              required
              label='Price per night'
              name='price'
              type='number'
              value={formData.price}
              onChange={handleChange}
              InputProps={{ inputProps: { min: 0 } }}
            />
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <TextField
                margin='normal'
                required
                label='Bedrooms'
                name='beds'
                type='number'
                value={formData.metadata.bedrooms}
                onChange={(event) =>
                  handleMetadataChange('bedrooms', event.target.value)
                }
                InputProps={{ inputProps: { min: 0 } }}
              />
              <TextField
                margin='normal'
                required
                label='Bedrooms'
                name='beds'
                type='number'
                value={formData.metadata.beds}
                onChange={(event) =>
                  handleMetadataChange('beds', event.target.value)
                }
                InputProps={{ inputProps: { min: 0 } }}
              />
            </div>
            <TextField
              margin='normal'
              required
              label='Bathrooms'
              name='bathrooms'
              type='number'
              value={formData.metadata.bathrooms}
              onChange={(event) =>
                handleMetadataChange('bathrooms', +event.target.value)
              }
              InputProps={{ inputProps: { min: 0 } }}
            />
            <input
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              multiple
              style={{ margin: '20px 0', width: '100%' }}
            />
            <InputLabel id='amenities-label'>Amenities</InputLabel>
            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
              Create
            </Button>
          </form>
        </div>
        <div style={imageFormContainer}>
          {formData.thumbnail && (
            <img
              src={formData.thumbnail}
              alt='Thumbnail'
              style={{ width: '100%' }}
            />
          )}
        </div>
      </div>
    </>
  );
};
