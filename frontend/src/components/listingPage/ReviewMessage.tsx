import React from 'react';
import { Typography, Box } from '@mui/material';
import { Review } from '../../interfaces/listingInterfaces';

interface ReviewMessageProps {
  review: Review;
}

export const ReviewMessage: React.FC<ReviewMessageProps> = ({ review }) => {
  const formattedRating = review.rating.toFixed(1);

  return (
    <div>
      <Box
        sx={{
          boxShadow: 1,
          width: '100%',
          display: 'flex',
          py: '10px',
          borderRadius: '10px',
        }}
      >
        <div style={{ padding: '0 20px', minWidth: '50px' }}>
          <Typography>{`★ ${formattedRating}`}</Typography>
        </div>
        <div
          style={{
            width: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            paddingRight: '20px',
          }}
        >
          <Typography>{review.reviewMsg}</Typography>
        </div>
      </Box>
    </div>
  );
};
