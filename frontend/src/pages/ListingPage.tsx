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
import { ListingReviewSection } from '../components/listingPage/ListingReviewSection';
import { ImageListModal } from '../components/listingPage/ImageListModal';
import { ListingBookingSection } from '../components/listingPage/ListingBookingSection';

export interface ListingHeaderProps {
  listing: Listing;
}

export const ListingPage: React.FC = () => {
  // Authorisation
  const { authToken } = useContext(AuthContext);
  const { listingId } = useParams();
  const parsedId: number = parseInt(listingId ?? '0', 10);

  const [imageListModalOpen, setImageListModalOpen] = useState<boolean>(false);

  // const handleOpenModal = () => {
  //   setImageListModalOpen(true);
  // };

  const handleCloseModal = () => {
    setImageListModalOpen(false);
  };

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

  /* eslint-disable-next-line multiline-ternary */
  return listing && parsedId ? (
    <div style={page}>
      <div style={contentContainer}>
        <ImageListModal
          open={imageListModalOpen}
          onClose={handleCloseModal}
          photos={listing.metadata?.photos}
        />
        <div style={{ ...infoContainer, marginTop: '20px' }}>
          <ListingHeader listing={listing} />
          <ListingImage
            listing={listing}
            openModal={() => setImageListModalOpen(true)}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}
          >
            <ListingAmmenities listing={listing} />
            <ListingReserveForm listing={listing} listingId={parsedId} />
          </div>
          <ListingBookingSection listing={listing} listingId={parsedId} />
          <ListingReviewSection listing={listing} listingId={parsedId} />
        </div>
      </div>
    </div>
  ) : (
    <>Loading...</>
  );
};
