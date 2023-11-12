import React, { useContext, useEffect, useState } from 'react';
import { Listing } from '../interfaces/listingInterfaces';

import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import AuthContext from '../contexts/AuthContext';
import { getListing } from '../helpers/listingApiHelpers';

export const ListingCard: React.FC<Listing> = ({ ...props }) => {
  const { authToken } = useContext(AuthContext);

  const [listing, setListing] = useState<Listing>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getListing(authToken, props.id);
        setListing(listing);
        console.log(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchData();
  }, [authToken]);

  const handleCardClick = () => {
    console.log(`Card pressed: ${props.title}`);
  };

  console.log(props);
  console.log(listing);

  return (
    <Card
      sx={{
        minWidth: '225px',
        width: '18%',
        cursor: 'pointer',
        mt: '15px',
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component='img'
        alt={props.title}
        image={props.thumbnail}
        sx={{ borderRadius: '5px', width: '100%', height: '250px' }}
      />
      <CardContent sx={{ fontFamily: 'Samsung-Light' }}>
        {/* Title */}
        <Typography gutterBottom variant='h6' component='div'>
          {props.title}
        </Typography>
        {/* State, Country */}
        <Typography gutterBottom variant='body1' component='div'>
          {`${props.address.city}, ${props.address.country}`}
        </Typography>
        {/* Type */}
        <Typography gutterBottom variant='body1' component='div'>
          {`${listing?.metadata?.propertyType}`}
        </Typography>
        {/* No. of beds, bedrooms, bathrooms */}
        <Typography gutterBottom variant='body1' component='div'>
          No. of beds, bedrooms, bathrooms
        </Typography>
        {/* No. reviews + ratings */}
        <Typography gutterBottom variant='body1' component='div'>
          {props.reviews === undefined ? '0' : `${props.reviews.length}`}
        </Typography>
        {/* Price */}
        <Typography variant='body1' color='text.primary'>
          ${props.price} / night
        </Typography>
      </CardContent>
    </Card>
  );
};

/**
 * Needs to display:
 * 1. Title - title
 * 2. Location - subtitle
 * 3. Type
 * 4. No. of beds, No. of bedrooms. No. of baths
 * 5. No. of Reviews + Rating
 * 6. Price - bit bigger text
 */
