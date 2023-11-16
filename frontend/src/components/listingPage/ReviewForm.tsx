import React from 'react';
import {
  TextareaAutosize,
  Button,
  Box,
  Typography,
  Rating,
  Divider,
} from '@mui/material';

export const ReviewForm: React.FC = () => {
  return (
    <div>
      <Divider />
      <form>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            margin: '10px 0',
          }}
        >
          <Typography style={{ fontFamily: 'Samsung-Regular' }}>
            Leave A Review
          </Typography>
          <TextareaAutosize
            aria-label='Leave a review'
            minRows={3}
            placeholder='Type your review here...'
            style={{
              width: 'calc(100% - 20px)',
              borderRadius: '10px',
              padding: '10px',
              marginTop: '20px',
            }}
          />
          <Rating
            name='half-rating'
            defaultValue={0}
            precision={0.5}
            size='large'
            sx={{ my: '10px' }}
          />
          <Button
            variant='contained'
            color='primary'
            fullWidth
            sx={{ mb: '30px' }}
          >
            Submit Review
          </Button>
        </Box>
      </form>
    </div>
  );
};
