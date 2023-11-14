import React, { useEffect, useContext, useState } from 'react';
import { contentContainer, page } from '../styles/pageStyles';
import { useParams } from 'react-router-dom';
import BookingsHeader from '../components/bookingsPage/bookingsHeader';
import { formContentDiv } from '../styles/addListing/addListingStyle';
import { getBookings } from '../helpers/bookingsApiHelper';
import AuthContext from '../contexts/AuthContext';
import { Booking } from '../interfaces/bookingsInterfaces';

export interface BookingsProps {
  bookings: Booking[];
}

export const BookingsPage: React.FC = () => {
  const { listingId } = useParams();
  const parsedId: number = parseInt(listingId!, 10);
  const [bookings, setBookings] = useState<Booking[]>();
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBookings(authToken);
        setBookings(data.bookings.filter(
          booking => booking.listingId === parsedId
        ));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [authToken, listingId]);

  /* eslint-disable-next-line multiline-ternary */
  return bookings ? (<div style={page}>
    <div style={contentContainer}>
      <div style={formContentDiv}>
        <BookingsHeader bookings={bookings} />
      </div>
    </div>
  </div>
  ) : (
    <>Loading...</>
  );
};
