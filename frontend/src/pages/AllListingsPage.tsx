import React, { useContext, useEffect, useState } from 'react';
import { contentContainer, page } from '../styles/pageStyles';
import { getListings } from '../helpers/listingApiHelpers';
import { Listing } from '../interfaces/listingInterfaces';
import { ListingCard } from '../components/ListingCard';
import AuthContext from '../contexts/AuthContext';

export const AllListingsPage: React.FC = () => {
  const { authToken } = useContext(AuthContext);

  const [listings, setListings] = useState<Listing[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getListings(authToken);
        setListings(data.listings);
        console.log(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchData();
  }, [authToken]);

  return (
    <div style={page}>
      <div style={contentContainer}>
        {listings.map((listing) => (
          <ListingCard key={listing.id} {...listing} />
        ))}
      </div>
    </div>
  );
};
