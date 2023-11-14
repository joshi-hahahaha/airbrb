import {
  ApiResponse,
} from '../interfaces/apiInterfaces';
import { apiCall } from './apiHelper';
import { BookingsRes } from '../interfaces/bookingsInterfaces';

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
