import React, { useContext, useEffect, useState } from 'react';
import { contentContainer, infoContainer, page } from '../styles/pageStyles';
import { useParams } from 'react-router-dom';
import { ListingHeader } from '../components/listingPage/ListingHeader';
import { Listing } from '../interfaces/listingInterfaces';
import { getListing } from '../helpers/listingApiHelpers';
import AuthContext from '../contexts/AuthContext';
import { ListingImage } from '../components/listingPage/ListingImage';
import { ListingAmmenities } from '../components/listingPage/ListingAmenities';
import { ListingReserveForm } from '../components/listingPage/ListingReserveForm';

export interface ListingHeaderProps {
  listing: Listing;
}

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
  return listing && parsedId ? (
    <div style={page}>
      <div style={contentContainer}>
        <div style={{ ...infoContainer, marginTop: '20px' }}>
          <ListingHeader listing={listing} />
          <ListingImage listing={listing} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ListingAmmenities listing={listing} />
            <ListingReserveForm listing={listing} listingId={parsedId} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>Loading...</>
  );
};
