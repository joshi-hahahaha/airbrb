import React, { useContext, useEffect, useState } from 'react';
import { contentContainer, page } from '../styles/pageStyles';
import { useParams } from 'react-router-dom';
import { formContentDiv } from '../styles/addListing/addListingStyle';
import { ListingHeader } from '../components/listingPage/ListingHeader';
import { Listing } from '../interfaces/listingInterfaces';
import { getListing } from '../helpers/listingApiHelpers';
import AuthContext from '../contexts/AuthContext';

export const ListingPage: React.FC = () => {
  // Authorisation
  const { authToken } = useContext(AuthContext);

  // Listing information handling
  const { listingId } = useParams();
  const parsedId: number = parseInt(listingId ?? '0', 10);

  const [listing, setListing] = useState<Listing>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getListing(authToken, parsedId);
        setListing(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchData();
  }, [authToken, listingId]);

  useEffect(() => console.log(listing), [listing]);

  /* eslint-disable-next-line multiline-ternary */
  return listing ? (
    <div style={page}>
      <div style={contentContainer}>
        <div style={formContentDiv}>
          {listingId}
          <ListingHeader listing={listing} />
        </div>
      </div>
    </div>
  ) : (
    <>Loading...</>
  );
};
