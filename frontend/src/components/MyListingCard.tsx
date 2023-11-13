import React, { useContext, useEffect, useState } from 'react';
import { Listing } from '../interfaces/listingInterfaces';
import { useNavigate } from 'react-router-dom';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box
} from '@mui/material';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import AuthContext from '../contexts/AuthContext';
import { getListing } from '../helpers/listingApiHelpers';
import LiveDatesModal from './LiveDatesModal';

export const MyListingCard: React.FC<Listing> = (props) => {
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log('Props in ListingCard:', props);

  const [listing, setListing] = useState<Listing>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // 3 dot menu

  const [liveDatesModalOpen, setLiveDatesModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setLiveDatesModalOpen(true);
  };

  const handleCloseModal = () => {
    setLiveDatesModalOpen(false);
  };

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
  }

  return (
    listing
      ? (<>
      <Card
        sx={{
          minWidth: '225px',
          // maxWidth: 'calc(20% - 30px)',
          // height: '500px',
          cursor: 'pointer',
          m: '15px',
          flex: '1',
        }}
        // onClick={handleCardClick}
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
          <Box display='flex' alignItems='center' justifyContent='space-between'>
            {/* Type */}
            <Typography gutterBottom variant='body1' component='div'>
              {`${listing?.metadata?.propertyType}`}
            </Typography>
            {/* No. reviews + ratings */}
            <Typography gutterBottom variant='body1' component='div'>
              {props.reviews === undefined ? '0' : `${props.reviews.length}`}
            </Typography>
          </Box>
          {/* No. of beds, bedrooms, bathrooms */}
          <Box display='flex' alignItems='center'>
            <Typography gutterBottom variant='body1' component='div'>
              <BedIcon />{`${listing?.metadata?.beds}`}
            </Typography>
            <Typography gutterBottom variant='body1' component='div'>
              <BathtubIcon />{`${listing?.metadata?.bathrooms}`}
            </Typography>
          </Box>
          {/* Price */}
          <Typography variant='body1' color='text.primary'>
            ${props.price} / night
          </Typography>
          <IconButton
          aria-label='more'
          aria-controls='long-menu'
          aria-haspopup='true'
          onClick={handleAnchorClick}
          >
            <MoreVertIcon />
          </IconButton>
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
        </CardContent>
      </Card>
      <LiveDatesModal open={liveDatesModalOpen} onClose={handleCloseModal} />
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
