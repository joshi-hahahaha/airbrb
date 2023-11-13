import React from 'react';
import { contentContainer, page } from '../styles/pageStyles';
import { useParams } from 'react-router-dom';
import { formContentDiv } from '../styles/addListing/addListingStyle';
import { EditListingForm } from '../components/editListing/EditListingForm';

export const EditListingPage: React.FC = () => {
  const { listingId } = useParams();

  return (
    <div style={page}>
      <div style={contentContainer}>
        <div style={formContentDiv}>
          <EditListingForm listingId={listingId} />
        </div>
      </div>
    </div>
  );
};
