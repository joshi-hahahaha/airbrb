import React, { useContext, useEffect, useState } from 'react';
import { contentContainer, listingContainer, page } from '../styles/pageStyles';
import AuthContext from '../contexts/AuthContext';
import { deleteListing, getListings } from '../helpers/listingApiHelpers';
import { Listing } from '../interfaces/listingInterfaces';
import { ListingCard } from '../components/ListingCard';
import {
  AlertPopUp,
  AlertPopUpProps,
  Severity,
} from '../components/AlertPopUp';
import { CustomError } from '../classes/CustomError';

export const MyListingsPage: React.FC = () => {
  const { authToken, email } = useContext(AuthContext);

  const [alertData, setAlertData] = useState<AlertPopUpProps>({
    show: false,
    message: '',
    severity: 'error',
  });

  const handleAlert = (message: string, severity: Severity, show: boolean) => {
    setAlertData({ message, severity, show });
  };

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
        if (error instanceof CustomError) {
          handleAlert(error.message, 'error', true);
        }
      }
    };

    fetchData();
  }, [authToken]);

  const handleListingDelete = async (listingId: number | undefined) => {
    try {
      if (listingId !== undefined) {
        await deleteListing(authToken, listingId);
        setListings((prevListings) =>
          prevListings.filter((listing) => listing.id !== listingId)
        );
      }
    } catch (error) {
      console.error('Error deleting listing:', error);
    }
  };

  return (
    <div style={page}>
      <AlertPopUp
        message={alertData.message}
        severity={alertData.severity}
        show={alertData.show}
        onAlertClose={() => handleAlert('', 'error', false)}
      />
      <div style={contentContainer}>
        <div style={listingContainer}>
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              myListing={true}
              onDelete={() => handleListingDelete(listing.id)}
              {...listing}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
