import React, { useContext, useEffect, useState } from 'react';
import { Listing } from '../interfaces/listingInterfaces';
import { useNavigate } from 'react-router-dom';

import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import AuthContext from '../contexts/AuthContext';
import { getListing } from '../helpers/listingApiHelpers';

export const MyListingCard: React.FC<Listing> = (props) => {
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log('Props in ListingCard:', props);

  const [listing, setListing] = useState<Listing>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getListing(authToken, props.id);

        setListing(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchData();
  }, [authToken, props.id]);

  const handleCardClick = () => {
    // console.log(`Card pressed: ${props.title}`);
    navigate(`/edit/${props.id}`);
  };

  return (
    listing
      ? (<>
      <Card
        sx={{
          minWidth: '225px',
          // maxWidth: 'calc(20% - 30px)',
          height: '500px',
          cursor: 'pointer',
          m: '15px',
          flex: '1',
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
            {listing.title}
          </Typography>
          {/* Type */}
          <Typography gutterBottom variant='body1' component='div'>
            {`${listing?.metadata?.propertyType}`}
          </Typography>
          {/* No. of beds, bedrooms, bathrooms */}
          <Typography gutterBottom variant='body1' component='div'>
            {`${listing?.metadata?.beds}`} beds
          </Typography>
          <Typography gutterBottom variant='body1' component='div'>
            {`${listing?.metadata?.bathrooms}`} bathrooms
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
    </>)
      : (<>
        <Typography>Loading...</Typography>;
    </>)

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
