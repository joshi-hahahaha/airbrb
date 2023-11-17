import React from 'react';
import { Typography, Box } from '@mui/material';
import { Review } from '../../interfaces/listingInterfaces';

interface ReviewMessageProps {
  review: Review;
}

export const ReviewMessage: React.FC<ReviewMessageProps> = ({ review }) => {
  return (
    <div>
      <Box
        sx={{
          boxShadow: 1,
          width: '100%',
          display: 'flex',
          py: '10px',
          mb: '20px',
          borderRadius: '10px',
        }}
      >
        <div style={{ padding: '0 20px', minWidth: '50px' }}>
          <Typography>{`★${review.rating}`}</Typography>
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
