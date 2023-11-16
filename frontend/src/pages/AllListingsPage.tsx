import React, { useContext, useEffect, useState } from 'react';
import { contentContainer, listingContainer, page } from '../styles/pageStyles';
import { getListings } from '../helpers/listingApiHelpers';
import { Listing } from '../interfaces/listingInterfaces';
import { ListingCard } from '../components/ListingCard';
import AuthContext from '../contexts/AuthContext';
import { CustomError } from '../classes/CustomError';
import {
  AlertPopUp,
  AlertPopUpProps,
  Severity,
} from '../components/AlertPopUp';

export const AllListingsPage: React.FC = () => {
  const { authToken } = useContext(AuthContext);

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
        setListings(data.listings);
      } catch (error) {
        if (error instanceof CustomError) {
          handleAlert(error.message, 'error', true);
        }
      }
    };

    fetchData();
  }, [authToken]);

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
            <ListingCard key={listing.id} myListing={false} {...listing} />
          ))}
        </div>
      </div>
    </div>
  );
};
