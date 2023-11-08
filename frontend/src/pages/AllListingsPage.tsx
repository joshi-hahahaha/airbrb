import React, { useContext, useEffect, useState } from 'react';
import { contentContainer, page } from '../styles/pageStyles';
import { Link } from 'react-router-dom';
import { getListings } from '../helpers/listingApiHelpers';
// import ListingCard from '../components/ListingCard';
import { Listing } from '../interfaces/listingInterfaces';
import { ListingCard } from '../components/ListingCard';
import AuthContext from '../contexts/AuthContext';

export const AllListingsPage: React.FC = () => {
  const { authToken } = useContext(AuthContext); // Use the useContext hook within a functional component

  const [listings, setListings] = useState<Listing[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getListings(authToken); // Pass authToken as an argument to the function
        setListings(data.listings);
        console.log(data); // Debugging: log the fetched data
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchData();
  }, [authToken]); // Add authToken as a dependency to the useEffect hook if needed

  return (
    <div style={page}>
      <div style={contentContainer}>
        <Link to='/register'>Open Register</Link>
        <Link to='/login'>Open Login</Link>
        {listings.map((listing) => (
          <ListingCard key={listing.id} {...listing} />
        ))}
      </div>
    </div>
  );
};
