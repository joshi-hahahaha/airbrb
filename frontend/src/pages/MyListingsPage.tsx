import React, { useContext, useEffect, useState } from 'react';
import { contentContainer, listingContainer, page } from '../styles/pageStyles';
import AuthContext from '../contexts/AuthContext';
import {
  unpublishListing,
  deleteListing,
  getListings,
} from '../helpers/listingApiHelpers';
import { Listing } from '../interfaces/listingInterfaces';
import { ListingCard } from '../components/ListingCard';
import {
  AlertPopUp,
  AlertPopUpProps,
  Severity,
} from '../components/AlertPopUp';
import { CustomError } from '../classes/CustomError';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

export const MyListingsPage: React.FC = () => {
  const { authToken, email } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const handleListingUnpublish = async (listingId: number | undefined) => {
    try {
      if (listingId !== undefined) {
        await unpublishListing(authToken, listingId);
      }
    } catch (error) {
      console.error('Error unpublishing listing:', error);
    }
  };

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
              onUnpublish={() => handleListingUnpublish(listing.id)}
              {...listing}
            />
          ))}
        </div>
      </div>
      <Fab
        color='primary'
        style={{
          position: 'fixed',
          bottom: 16,
          right: 80,
        }}
        onClick={() => navigate('/add-listing')}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};
