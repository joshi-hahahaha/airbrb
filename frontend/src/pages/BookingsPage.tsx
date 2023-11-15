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
  bookings: Booking[];
  listing: Listing;
}

export const BookingsPage: React.FC = () => {
  const { authToken } = useContext(AuthContext);

  const { listingId } = useParams();
  const parsedId: number = parseInt(listingId!, 10);

  const [bookings, setBookings] = useState<Booking[]>();
  const [listing, setListing] = useState<Listing>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingsData = await getBookings(authToken);
        setBookings(bookingsData.bookings.filter(
          booking => booking.listingId === parsedId
        ));

        const listingData = await getListing(authToken, parsedId);
        setListing(listingData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [authToken, listingId]);

  /* eslint-disable-next-line multiline-ternary */
  return bookings && listing ? (<div style={page}>
    <div style={contentContainer}>
      <div style={formContentDiv}>
        <BookingsHeader bookings={bookings} listing={listing} />
        <BookingsPending bookings={bookings} listing={listing} />
        <BookingsHistory bookings={bookings} listing={listing} />
      </div>
    </div>
  </div>
  ) : (
    <>Loading...</>
  );
};
