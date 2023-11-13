import React, { useContext, useEffect, useState } from 'react';
import { contentContainer, listingContainer, page } from '../styles/pageStyles';
import AuthContext from '../contexts/AuthContext';
import { getListings } from '../helpers/listingApiHelpers';
import { Listing } from '../interfaces/listingInterfaces';
// import { MyListingCard } from '../components/MyListingCard';
import { ListingCard } from '../components/ListingCard';

export const MyListingsPage: React.FC = () => {
  const { authToken, email } = useContext(AuthContext);

  const [listings, setListings] = useState<Listing[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getListings(authToken);
        const userOwnedListings = data.listings.filter(
          (listing) => listing.owner === email
        );
        setListings(userOwnedListings);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchData();
  }, [authToken]);

  return (
    <div style={page}>
      <div style={contentContainer}>
        <div style={listingContainer}>
          {listings.map((listing) => (
            <ListingCard key={listing.id} myListing={true} {...listing} />
          ))}
        </div>
      </div>
    </div>
  );
};
