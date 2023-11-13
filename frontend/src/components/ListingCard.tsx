import React, { useContext, useEffect, useState } from 'react';
import { Listing } from '../interfaces/listingInterfaces';

import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';

import AuthContext from '../contexts/AuthContext';
import { getListing } from '../helpers/listingApiHelpers';
import { useNavigate } from 'react-router-dom';
import LiveDatesModal from './LiveDatesModal';
import theme from '../assets/theme';

interface ListingCardProps extends Listing {
  myListing?: boolean;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  myListing,
  ...props
}) => {
  const { authToken } = useContext(AuthContext);

  const navigate = useNavigate();
  // console.log('Props in ListingCard:', props);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // 3 dot menu

  const [liveDatesModalOpen, setLiveDatesModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setLiveDatesModalOpen(true);
  };

  const handleCloseModal = () => {
    setLiveDatesModalOpen(false);
  };

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

  const handleAnchorClick = (event: React.MouseEvent<HTMLElement>) => {
    // event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleAnchorClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    navigate(`/edit/${props.id}`);
  };

  const handleCardClick = () => {
    console.log(`Card pressed: ${props.title}`);
    console.log(myListing);
  };

  console.log(props);
  console.log(listing);

  return (
    <>
      <Card
        sx={{
          minWidth: '225px',
          height: '500px',
          cursor: 'pointer',
          m: '15px',
          flex: '1',
          position: 'relative',
        }}
        onClick={handleCardClick}
      >
        <CardMedia
          component='img'
          alt={props.title}
          image={props.thumbnail}
          sx={{ borderRadius: '5px', width: '100%', height: '250px' }}
        />
        {/* eslint-disable-next-line multiline-ternary */}
        {myListing ? (
          <>
            <IconButton
              aria-label='more'
              aria-controls='long-menu'
              aria-haspopup='true'
              onClick={handleAnchorClick}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: theme.palette.primary.main,
                opacity: '0.8',
                color: '#fff',
              }}
            >
              <MoreVertIcon />
            </IconButton>
          </>
        ) : (
          <></>
        )}

        <CardContent sx={{ fontFamily: 'Samsung-Light', display: 'flex' }}>
          <div style={{ width: '85%' }}>
            {/* Title */}
            <Typography
              sx={{ fontFamily: 'Samsung-Regular' }}
              gutterBottom
              variant='h6'
              component='div'
            >
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography gutterBottom variant='body1' component='div'>
                <BedIcon />
                {`${listing?.metadata?.beds}`}
              </Typography>
              <Typography gutterBottom variant='body1' component='div'>
                <BathtubIcon />
                {`${listing?.metadata?.bathrooms}`}
              </Typography>
            </div>

            {/* Price */}
            <Typography variant='body1' color='text.primary'>
              ${props.price} / night
            </Typography>
          </div>

          <div style={{ width: '15%' }}>
            {/* No. reviews + ratings */}
            <Typography gutterBottom variant='body1' component='div'>
              {props.reviews === undefined ? '0' : `${props.reviews.length}`}
            </Typography>
          </div>
        </CardContent>
      </Card>
      <Menu
        id='long-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleAnchorClose}
      >
        <MenuItem onClick={handleEditClick}>Edit</MenuItem>
        <MenuItem onClick={handleOpenModal}>Edit Availabilities</MenuItem>
        <MenuItem onClick={handleEditClick}>Go Live</MenuItem>
        <MenuItem onClick={handleAnchorClose}>Delete</MenuItem>
      </Menu>
      <LiveDatesModal open={liveDatesModalOpen} onClose={handleCloseModal} />
    </>
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
