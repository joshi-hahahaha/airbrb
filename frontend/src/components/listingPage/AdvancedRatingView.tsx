import { Box, Button, Fade, Modal, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { ListingHeaderProps } from '../../pages/ListingPage';

export const AdvancedRatingView: React.FC<ListingHeaderProps> = ({
  listing,
}) => {
  console.log(listing);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const countReviewsForStar = (rating: number): number => {
    if (listing.reviews !== undefined) {
      return listing.reviews.filter((review) => review.rating === rating)
        .length;
    } else {
      return 0;
    }
  };

  const calcReviewPercentage = (rating: number): number => {
    if (listing.reviews !== undefined) {
      const totalReviews = listing.reviews.length;

      const filteredReviews = listing.reviews.filter(
        (review) => review.rating === rating
      ).length;
      return (filteredReviews / totalReviews) * 100;
    } else {
      return 0;
    }
  };

  const renderStarButton = (rating: number): JSX.Element => (
    <Tooltip
      key={rating}
      title={`👁 ${countReviewsForStar(rating)} - ${calcReviewPercentage(
        rating
      ).toFixed(2)}%`}
    >
      <Button onClick={handleOpen}>
        <Typography variant='h6'>{`★ ${rating}`}</Typography>
      </Button>
    </Tooltip>
  );

  return (
    <>
      <div style={{ width: '100%' }}>
        {[1, 2, 3, 4, 5].map(renderStarButton)}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              height: '80%',
              width: '60%',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: '10px',
            }}
          >
            <Typography id='transition-modal-title' variant='h6' component='h2'>
              Text in a modal
            </Typography>
            <Typography id='transition-modal-description' sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
