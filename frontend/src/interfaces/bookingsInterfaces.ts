export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface Booking {
  id: number;
  owner: string;
  dateRange: DateRange;
  totalPrice: number;
  listingId: number;
  status: string;
}

export interface BookingsRes {
  bookings: Booking[];
}
