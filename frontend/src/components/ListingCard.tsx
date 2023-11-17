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
import BedroomParentIcon from '@mui/icons-material/BedroomParent';

import AuthContext from '../contexts/AuthContext';
import { getListing } from '../helpers/listingApiHelpers';
import { useNavigate } from 'react-router-dom';
import LiveDatesModal from './LiveDatesModal';
import theme from '../assets/theme';
import { calcRating } from '../helpers/reviewsHelper';
import { AmentityIcon } from './AmentityIconText';
import { isImgFile } from '../helpers/generalHelpers';

interface ListingCardProps extends Listing {
  myListing?: boolean;
  onDelete?: () => void;
  onUnpublish?: () => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  myListing,
  onDelete,
  onUnpublish,
  ...props
}) => {
  const { authToken } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [unpublishBtn, setUnpublishBtn] = useState<boolean>(false);
  const [liveDatesModalOpen, setLiveDatesModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setLiveDatesModalOpen(true);
    setAnchorEl(null);
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
        if (data.published) {
          setUnpublishBtn(true);
        }
        // console.log(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchData();
  }, [authToken, props.id]);

  const handleAnchorClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleAnchorClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    navigate(`/edit/${props.id}`);
  };

  const handleUnpublishClick = () => {
    if (onUnpublish) onUnpublish();
    setUnpublishBtn(false);
    setAnchorEl(null);
  };

  const handleListingDelete = () => {
    if (onDelete) onDelete();
  };

  // Card on My Listings page navigates to bookings,
  // On all listings nav to viewing the listing
  const handleCardClick = () => {
    // console.log(`Card pressed: ${props.title}`);
    console.log(isImgFile(props.thumbnail));
    if (myListing) {
      navigate(`/bookings/${props.id}`);
    } else {
      navigate(`/listings/${props.id}`);
    }
  };

  return (
    <>
      <Card
        sx={{
          minWidth: '225px',
          height: '460px',
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

        <CardContent
          sx={{ fontFamily: 'Samsung-Light', display: 'flex', height: '185px' }}
        >
          <div
            style={{
              width: '85%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              {/* Title */}
              <Typography
                sx={{ fontFamily: 'Samsung-Regular' }}
                gutterBottom
                variant='h5'
                component='div'
                overflow='hidden'
                textOverflow='ellipsis'
                whiteSpace='nowrap'
              >
                {props.title}
              </Typography>

              {/* Type + State, Country */}
              <Typography gutterBottom variant='body1' component='div'>
                {`${listing?.metadata?.propertyType} located in ${props.address.city}, ${props.address.country}`}
              </Typography>

              {/* No. of beds, bedrooms, bathrooms */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  gutterBottom
                  variant='body1'
                  component='div'
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingRight: '4px',
                  }}
                >
                  {`${listing?.metadata?.beds}`}
                  <BedIcon />
                </Typography>
                <Typography
                  gutterBottom
                  variant='body1'
                  component='div'
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingRight: '4px',
                  }}
                >
                  {`${listing?.metadata?.bedrooms}`}
                  <BedroomParentIcon />
                </Typography>
                <Typography
                  gutterBottom
                  variant='body1'
                  component='div'
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingRight: '4px',
                  }}
                >
                  {`${listing?.metadata?.bathrooms}`}
                  <BathtubIcon />
                </Typography>
              </div>
            </div>
            <div>
              {/* Amenities */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  paddingRight: '4px',
                }}
              >
                <Typography gutterBottom variant='body1' component='div'>
                  Includes:
                </Typography>
                {listing?.metadata?.amenities && (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {listing.metadata.amenities.map((amenity, index) => (
                      <AmentityIcon key={index} amenity={amenity} />
                    ))}
                  </div>
                )}
              </div>

              {/* Price */}
              <Typography
                variant='h6'
                style={{ fontFamily: 'Samsung-Regular' }}
              >
                ${props.price} / night
              </Typography>
            </div>
          </div>

          <div style={{ width: '15%' }}>
            {/* No. reviews + ratings */}
            <Typography
              style={{ textAlign: 'right' }}
              gutterBottom
              variant='body1'
              component='div'
            >
              {props.reviews === undefined
                ? `★ ${(0).toFixed(1)}`
                : `★ ${calcRating(props.reviews).toFixed(1)}`}
            </Typography>
            <Typography
              style={{ textAlign: 'right' }}
              gutterBottom
              variant='body1'
              component='div'
            >
              {props.reviews === undefined
                ? '👁 0'
                : `👁 ${props.reviews.length}`}
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
        <MenuItem onClick={handleOpenModal}>Add Availabilities</MenuItem>
        {unpublishBtn && (
          <MenuItem onClick={handleUnpublishClick}>Unpublish</MenuItem>
        )}
        <MenuItem onClick={handleListingDelete}>Delete</MenuItem>
      </Menu>
      <LiveDatesModal
        open={liveDatesModalOpen}
        onClose={handleCloseModal}
        updateUnpublishBtn={setUnpublishBtn}
        listingId={props.id}
      />
    </>
  );
};
