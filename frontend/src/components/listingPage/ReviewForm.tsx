import React, { useContext, useState } from 'react';
import {
  TextareaAutosize,
  Button,
  Box,
  Typography,
  Rating,
  Divider,
} from '@mui/material';
import { AlertPopUp, AlertPopUpProps, Severity } from '../AlertPopUp';
import { ReviewReqObj, makeReview } from '../../helpers/reviewApiHelpers';
import AuthContext from '../../contexts/AuthContext';
import { CustomError } from '../../classes/CustomError';

interface ListingReviewFormProps {
  listingId: number;
  bookingId: number;
}

export const ReviewForm: React.FC<ListingReviewFormProps> = ({
  listingId,
  bookingId,
}) => {
  const [reviewMsg, setReviewMsg] = useState<string>('');
  const [ratingValue, setRatingValue] = useState<number>(0);
  const { authToken } = useContext(AuthContext);

  // console.log(bookingId);
  // console.log(listingId);

  const handleReviewMsgChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReviewMsg(event.target.value);
  };

  const handleRatingChange = (newValue: number | null) => {
    if (newValue !== null) setRatingValue(newValue);
  };

  const handleSubmit = async () => {
    if (reviewMsg === '') {
      handleAlert('Review was empty. Please make a review.', 'error', true);
    } else if (ratingValue === null) {
      handleAlert('Invalid rating. Please give a rating.', 'error', true);
    }

    const reviewObj: ReviewReqObj = {
      review: {
        reviewMsg: reviewMsg,
        rating: ratingValue,
      },
    };

    // console.log(reviewObj);
    // Change 4th param to bookingid
    try {
      await makeReview(authToken, reviewObj, listingId, bookingId);
    } catch (error) {
      if (error instanceof CustomError) {
        handleAlert(error.message, 'error', true);
      }
    }
  };

  const [alertData, setAlertData] = useState<AlertPopUpProps>({
    show: false,
    message: '',
    severity: 'error',
  });

  const handleAlert = (message: string, severity: Severity, show: boolean) => {
    setAlertData({ message, severity, show });
  };

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
          <AlertPopUp
            message={alertData.message}
            severity={alertData.severity}
            show={alertData.show}
            onAlertClose={() => handleAlert('', 'error', false)}
          />
          <TextareaAutosize
            aria-label='Leave a review'
            minRows={3}
            placeholder='Type your review here...'
            value={reviewMsg}
            onChange={handleReviewMsgChange}
            style={{
              width: 'calc(100% - 20px)',
              borderRadius: '10px',
              padding: '10px',
              marginTop: '20px',
            }}
          />
          <Rating
            name='half-rating'
            value={ratingValue}
            precision={0.5}
            size='large'
            onChange={(e, newValue) => handleRatingChange(newValue)}
            sx={{ my: '10px' }}
          />
          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={handleSubmit}
            sx={{ mb: '30px' }}
          >
            Submit Review
          </Button>
        </Box>
      </form>
    </div>
  );
};
