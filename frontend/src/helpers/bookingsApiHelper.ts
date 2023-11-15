import {
  ApiResponse,
} from '../interfaces/apiInterfaces';
import { apiCall } from './apiHelper';
import { BookingsRes, HandleBookingRes } from '../interfaces/bookingsInterfaces';

export const getBookings = async (
  authToken: string | null
): Promise<BookingsRes> => {
  const token: string | null = authToken;

  const res: ApiResponse<BookingsRes> = await apiCall<BookingsRes>(
    '/bookings',
    'GET',
    null,
    token,
    undefined
  );

  if (res.error) {
    console.group(res.error);
  } else if (res.data) {
    return res.data;
  } else {
    console.log('Unexpected response structure:', res);
  }

  return { bookings: [] };
}

export const handleBooking = async (
  authToken: string | null,
  bookingId: number,
  response: string
) => {
  const token: string | null = authToken;

  const res: ApiResponse<HandleBookingRes> = await apiCall<BookingsRes>(
    `/bookings/${response}/${bookingId}`,
    'PUT',
    null,
    token,
    undefined
  );

  if (res.error) {
    console.log(res.error);
  } else if (res.data) {
    return res.data;
  }
}
