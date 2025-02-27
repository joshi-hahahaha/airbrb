import React, { useContext, useEffect, useState } from 'react';
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
  ImageList,
  ImageListItem,
  InputLabel,
  TextField,
  Typography,
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  IconButton,
  Switch,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Address,
  Metadata,
  NewListingFormData,
  Amenity,
  PropertyType,
  Listing,
} from '../../interfaces/listingInterfaces';
import { editListing, getListing } from '../../helpers/listingApiHelpers';
import AuthContext from '../../contexts/AuthContext';

import PoolIcon from '@mui/icons-material/Pool';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import WifiIcon from '@mui/icons-material/Wifi';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import theme from '../../assets/theme';
import { AlertPopUp, AlertPopUpProps, Severity } from '../AlertPopUp';
import { CustomError } from '../../classes/CustomError';
import { useNavigate } from 'react-router-dom';
import { formatYoutubeVid, isImgFile } from '../../helpers/generalHelpers';

interface EditListingFormProps {
  listingId: string | undefined;
}

export const EditListingForm: React.FC<EditListingFormProps> = ({
  listingId,
}) => {
  const [isThumbnailVideo, setIsThumbnailVideo] = useState<boolean>(false);

  const handleSwitchChange = () => {
    setIsThumbnailVideo(!isThumbnailVideo);
    setFormData({
      ...formData,
      thumbnail: '',
    });
  };

  // Authorisation
  const { authToken } = useContext(AuthContext);

  // FormData DEFAULT state
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
      amenities: [],
      photos: [],
      propertyType: 'House',
      bedrooms: 0,
      beds: 0,
      bathrooms: 0,
    },
  });

  const [alertData, setAlertData] = useState<AlertPopUpProps>({
    show: false,
    message: '',
    severity: 'error',
  });

  const handleAlert = (message: string, severity: Severity, show: boolean) => {
    setAlertData({ message, severity, show });
  };

  // Listing information handling
  const parsedId: number = parseInt(listingId ?? '0', 10);

  const [listing, setListing] = useState<Listing>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getListing(authToken, parsedId);
        setListing(data);
      } catch (error) {
        if (error instanceof CustomError) {
          handleAlert(error.message, 'error', true);
        }
      }
    };

    fetchData();
  }, [authToken, listingId]);

  // Update formData with old listing info
  useEffect(() => {
    // Log the updated listing state
    console.log(listing);
    setFormData({
      title: listing?.title || '',
      address: {
        street: listing?.address?.street || '',
        city: listing?.address?.city || '',
        state: listing?.address?.state || '',
        postcode: listing?.address?.postcode || '',
        country: listing?.address?.country || '',
      },
      price: listing?.price || 0,
      thumbnail: listing?.thumbnail || '',
      metadata: {
        amenities: listing?.metadata?.amenities || [],
        photos: listing?.metadata?.photos || [],
        propertyType: listing?.metadata?.propertyType || 'House',
        bedrooms: listing?.metadata?.bedrooms || 0,
        beds: listing?.metadata?.beds || 0,
        bathrooms: listing?.metadata?.bathrooms || 0,
      },
    });
    setIsThumbnailVideo(!isImgFile(formData.thumbnail));
  }, [listing]);

  /**
   * Form change handlers
   * 1. Standard form inputs
   * 2. Nested form inputs:
   *  a. Address properties
   *  b. Metadata properties
   * 3. Photos
   *  a. Thumbnail - standard
   *  b. Multiple photos - nested within metadata
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const isNumber = ['price'].includes(name);
    setFormData({
      ...formData,
      [name]: isNumber ? Number(value) : value,
    });
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
    const isNumber = ['bedrooms', 'beds', 'bathrooms'].includes(name);
    setFormData((prevData) => ({
      ...prevData,
      metadata: {
        ...prevData.metadata,
        [name]: isNumber ? Number(value) : value,
      },
    }));
  };

  const handleAmenitiesChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checkedAmenity: Amenity
  ) => {
    /* eslint-disable indent */
    setFormData((prevData) => {
      const updatedAmenities = event.target.checked
        ? [...prevData.metadata.amenities, checkedAmenity]
        : prevData.metadata.amenities.filter(
            (amenity) => amenity !== checkedAmenity
          );

      return {
        ...prevData,
        metadata: {
          ...prevData.metadata,
          amenities: updatedAmenities,
        },
      };
    });
  };

  const handleThumbnailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, thumbnail: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotosChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray: string[] = [];
      const reader = new FileReader();

      reader.onloadend = () => {
        fileArray.push(reader.result as string);
        setFormData((prevData) => ({
          ...prevData,
          metadata: {
            ...prevData.metadata,
            photos: [...prevData.metadata.photos, ...fileArray],
          },
        }));
      };

      for (let i = 0; i < files.length; i++) {
        reader.readAsDataURL(files[i]);
      }
    }
  };

  // Remove photo from image list
  const handleRemovePhoto = (index: number) => {
    setFormData((prevData) => {
      const updatedPhotos = [...prevData.metadata.photos];
      updatedPhotos.splice(index, 1);

      return {
        ...prevData,
        metadata: {
          ...prevData.metadata,
          photos: updatedPhotos,
        },
      };
    });
  };
  const navigate = useNavigate();

  // Form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    try {
      await editListing(authToken, parsedId, formData);
      handleAlert('Success', 'success', true);
      navigate('/my-listings');
    } catch (error) {
      if (error instanceof CustomError) {
        handleAlert(error.message, 'error', true);
      }
    }
  };

  return (
    <>
      <Typography variant='h5' gutterBottom style={{ marginTop: '40px' }}>
        Edit Listing
      </Typography>
      <form onSubmit={handleSubmit} style={formContainer}>
        <div style={textFormContainer}>
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
          <FormControl fullWidth margin='normal'>
            <InputLabel id='property-type-label'>Property Type</InputLabel>
            <Select
              labelId='property-type-label'
              id='property-type-select'
              value={formData.metadata.propertyType}
              label='Property Type'
              onChange={(event) => {
                setFormData({
                  ...formData,
                  metadata: {
                    ...formData.metadata,
                    propertyType: event.target.value as PropertyType,
                  },
                });
              }}
            >
              <MenuItem value='House'>House</MenuItem>
              <MenuItem value='Apartment'>Apartment</MenuItem>
              <MenuItem value='Resort'>Resort</MenuItem>
              <MenuItem value='Mansion'>Mansion</MenuItem>
              <MenuItem value='Hotel'>Hotel</MenuItem>
            </Select>
          </FormControl>
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
              label='Beds'
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
              handleMetadataChange('bathrooms', event.target.value)
            }
            InputProps={{ inputProps: { min: 0 } }}
          />
          <div>
            <InputLabel id='amenities-label'>Amenities</InputLabel>
            <Checkbox
              icon={<PoolIcon />}
              checkedIcon={<PoolIcon />}
              checked={formData.metadata.amenities.includes('Swimming Pool')}
              onChange={(event) =>
                handleAmenitiesChange(event, 'Swimming Pool')
              }
              value='Swimming Pool'
            />
            <Checkbox
              icon={<FitnessCenterIcon />}
              checkedIcon={<FitnessCenterIcon />}
              checked={formData.metadata.amenities.includes('Gym')}
              onChange={(event) => handleAmenitiesChange(event, 'Gym')}
              value='Gym'
            />
            <Checkbox
              icon={<LocalParkingIcon />}
              checkedIcon={<LocalParkingIcon />}
              checked={formData.metadata.amenities.includes('Parking')}
              onChange={(event) => handleAmenitiesChange(event, 'Parking')}
              value='Parking'
            />
            <Checkbox
              icon={<WifiIcon />}
              checkedIcon={<WifiIcon />}
              checked={formData.metadata.amenities.includes('WiFi')}
              onChange={(event) => handleAmenitiesChange(event, 'WiFi')}
              value='WiFi'
            />
            <Checkbox
              icon={<AcUnitIcon />}
              checkedIcon={<AcUnitIcon />}
              checked={formData.metadata.amenities.includes('Air Conditioning')}
              onChange={(event) =>
                handleAmenitiesChange(event, 'Air Conditioning')
              }
              value='Air Conditioning'
            />
          </div>
          <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
            Make Changes
          </Button>
          <AlertPopUp
            message={alertData.message}
            severity={alertData.severity}
            show={alertData.show}
            onAlertClose={() => handleAlert('', 'error', false)}
          />
        </div>
        <div style={imageFormContainer}>
          <Typography variant='h6' gutterBottom style={{ marginTop: '10px' }}>
            Change Property Photos
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='body2'>Thumbnail Video</Typography>
            <Switch checked={isThumbnailVideo} onChange={handleSwitchChange} />
          </div>
          {/* eslint-disable-next-line multiline-ternary */}
          {isThumbnailVideo ? (
            <div>
              <Typography variant='subtitle1' gutterBottom>
                Change Video Thumbnail
              </Typography>
              <TextField
                margin='normal'
                required
                fullWidth
                label='Youtube Link'
                name='thumbnail'
                type='text'
                value={formData.thumbnail}
                onChange={handleChange}
                sx={{ m: 0, mb: '20px' }}
              />
            </div>
          ) : (
            <div>
              <Typography variant='subtitle1' gutterBottom>
                Change Image Thumbnail
              </Typography>
              <input
                type='file'
                accept='image/*'
                onChange={handleThumbnailChange}
                style={{ marginBottom: '20px', width: '100%' }}
              />
            </div>
          )}
          <Divider />
          {/* eslint-disable-next-line multiline-ternary */}
          {isThumbnailVideo ? (
            <>
              {formData.thumbnail && !isImgFile(formData.thumbnail) && (
                <iframe
                  title={formData.title}
                  src={formatYoutubeVid(formData.thumbnail)}
                  allowFullScreen
                  style={{
                    width: '100%',
                    height: '250px',
                  }}
                ></iframe>
              )}
            </>
          ) : (
            <>
              {formData.thumbnail && isImgFile(formData.thumbnail) && (
                <img
                  src={formData.thumbnail}
                  alt='Thumbnail'
                  style={{ width: '100%' }}
                />
              )}
            </>
          )}
          <Typography
            variant='subtitle1'
            gutterBottom
            style={{ marginTop: '10px' }}
          >
            Change Photos
          </Typography>
          <input
            type='file'
            accept='image/*'
            onChange={handlePhotosChange}
            style={{ marginBottom: '20px', width: '100%' }}
            multiple
          />
          <Divider />
          <div style={{ height: '300px', overflowY: 'auto' }}>
            <ImageList variant='masonry' cols={3} gap={8}>
              {formData.metadata.photos.map((photo, index) => (
                <ImageListItem key={index} style={{ position: 'relative' }}>
                  <IconButton
                    aria-label='more'
                    color='error'
                    onClick={() => handleRemovePhoto(index)}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      backgroundColor: theme.palette.error.main,
                      opacity: '0.8',
                      color: '#fff',
                    }}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                  <img
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    style={{ width: '100%', cursor: 'pointer' }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </div>
      </form>
    </>
  );
};
