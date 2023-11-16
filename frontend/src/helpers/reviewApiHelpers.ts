import { CustomError } from '../classes/CustomError';
import { ApiResponse, HttpMethod } from '../interfaces/apiInterfaces';
import { Review } from '../interfaces/listingInterfaces';
import { apiCall } from './apiHelper';

interface ReviewRes {}

export interface ReviewReqObj {
  review: Review;
}

export const makeReview = async (
  authToken: string | null,
  reviewObj: ReviewReqObj,
  listingId: number | undefined,
  bookingId: number | undefined
) => {
  const path: string = `/listings/${listingId}/review/${bookingId}`;
  const method: HttpMethod = 'PUT';
  const body: ReviewReqObj = { ...reviewObj };
  const token: string | null = authToken;
  const queryStr: string | undefined = undefined;

  const res: ApiResponse<ReviewRes> = await apiCall<ReviewRes>(
    path,
    method,
    body,
    token,
    queryStr
  );

  if (res.error) {
    throw new CustomError(res.error);
  } else if (res.data && res.data) {
    return res.data;
  } else {
    throw new CustomError('Unexpected response.');
  }
};
