export interface DateRange {
  startDate: string;
  endDate: string;
}

export type Status = 'accepted' | 'denied' | 'pending';

export interface Booking {
  id: number;
  owner: string;
  dateRange: DateRange;
  totalPrice: number;
  listingId: string;
  status: Status;
}

export interface BookingsRes {
  bookings: Booking[];
}

export interface HandleBookingRes {}
