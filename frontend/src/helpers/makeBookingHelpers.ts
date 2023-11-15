import { ApiResponse, HttpMethod } from '../interfaces/apiInterfaces';
import { DateRange } from '../interfaces/bookingsInterfaces';
import { apiCall } from './apiHelper';

interface BookingRes {
  bookingId: number;
}

export interface BookingReq {
  dateRange: DateRange;
  totalPrice: number;
}

export const makeBookingRequest = async (
  authToken: string | null,
  bookingReqObj: BookingReq,
  listingId: number | undefined
) => {
  const path: string = `/bookings/new/${listingId}`;
  const method: HttpMethod = 'POST';
  const body: BookingReq = { ...bookingReqObj };
  const token: string | null = authToken;
  const queryStr: string | undefined = undefined;

  const res: ApiResponse<BookingRes> = await apiCall<BookingRes>(
    path,
    method,
    body,
    token,
    queryStr
  );

  if (res.error) {
    // console.log(res.error);
  } else if (res.data && res.data) {
    return res.data;
  } else {
    // console.log('Unexpected response structure:', res);
  }
};
