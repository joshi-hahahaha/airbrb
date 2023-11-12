import React from 'react';
import { Listing } from '../interfaces/listingInterfaces';

import { Card, CardContent, CardMedia, Typography } from '@mui/material';

export const ListingCard: React.FC<Listing> = ({ ...props }) => {
  console.log(props);

  const handleCardClick = () => {
    console.log(`Card pressed: ${props.title}`);
  };

  return (
    <Card
      sx={{
        minWidth: '225px',
        width: '18%',
        height: '400px',
        cursor: 'pointer',
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component='img'
        alt={props.title}
        image={props.thumbnail}
        sx={{ borderRadius: '5px', width: '100%', height: '250px' }}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {props.title}
        </Typography>
        <Typography variant='body1' color='text.primary'>
          ${props.price} / night
        </Typography>
      </CardContent>
    </Card>
  );
};
