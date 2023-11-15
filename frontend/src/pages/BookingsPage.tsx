import React, { useEffect, useContext, useState } from 'react';
import { contentContainer, page } from '../styles/pageStyles';
import { useParams } from 'react-router-dom';
import BookingsHeader from '../components/bookingsPage/bookingsHeader';
import { formContentDiv } from '../styles/addListing/addListingStyle';
import { getBookings } from '../helpers/bookingsApiHelper';
import AuthContext from '../contexts/AuthContext';
import { Booking } from '../interfaces/bookingsInterfaces';
import { Listing } from '../interfaces/listingInterfaces';
import { getListing } from '../helpers/listingApiHelpers';
import BookingsHistory from '../components/bookingsPage/bookingsHistory';
import BookingsPending from '../components/bookingsPage/bookingsPending';

export interface BookingsProps {
  listingId: string | undefined;
  bookings: Booking[];
  listing: Listing;
  processedBookings: number[];
  setProcessedBookings: React.Dispatch<React.SetStateAction<number[]>>;
  handleBookingStatusChange: (bookingId: number, newStatus: Booking['status']) => void;
}

export const BookingsPage: React.FC = () => {
  const { authToken } = useContext(AuthContext);

  const { listingId } = useParams();
  const parsedId: number = parseInt(listingId!, 10);

  const [bookings, setBookings] = useState<Booking[]>();
  const [listing, setListing] = useState<Listing>();

  // IDs for bookings no longer pending
  const [processedBookings, setProcessedBookings] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingsData = await getBookings(authToken);

        const listingData = await getListing(authToken, parsedId);
        console.log(listingData);
        console.log(listing);
        console.log(parsedId);
        console.log(typeof bookingsData, bookingsData);
        console.log(typeof bookingsData.bookings[0], bookingsData.bookings[0]);
        setBookings(bookingsData.bookings.filter(
          booking => booking.listingId === listingId
        ));
        setListing(listingData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [authToken, listingId]);

  // handle status changed from pending
  const handleBookingStatusChange = (bookingId: number, newStatus: Booking['status']) => {
    setBookings(currentBookings =>
      currentBookings!.map(booking =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      )
    );
    setProcessedBookings(prevState => [...prevState, bookingId]);
  };

  /* eslint-disable-next-line multiline-ternary */
  return bookings && listing ? (<div style={page}>
    <div style={contentContainer}>
      <div style={formContentDiv}>
        <BookingsHeader
          listingId={listingId}
          bookings={bookings}
          listing={listing}
          processedBookings={processedBookings}
          setProcessedBookings={setProcessedBookings}
          handleBookingStatusChange={handleBookingStatusChange}
        />
        <BookingsPending
          listingId={listingId}
          bookings={bookings}
          listing={listing}
          processedBookings={processedBookings}
          setProcessedBookings={setProcessedBookings}
          handleBookingStatusChange={handleBookingStatusChange}
        />
        <BookingsHistory
          listingId={listingId}
          bookings={bookings}
          listing={listing}
          processedBookings={processedBookings}
          setProcessedBookings={setProcessedBookings}
          handleBookingStatusChange={handleBookingStatusChange}
        />
      </div>
    </div>
  </div>
  ) : (
    <>Loading...</>
  );
};
