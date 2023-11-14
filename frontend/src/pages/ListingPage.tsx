import React from 'react';
import { contentContainer, page } from '../styles/pageStyles';
import { useParams } from 'react-router-dom';
import { formContentDiv } from '../styles/addListing/addListingStyle';

export const ListingPage: React.FC = () => {
  const { listingId } = useParams();

  return (
    <div style={page}>
      <div style={contentContainer}>
        <div style={formContentDiv}>{listingId}</div>
      </div>
    </div>
  );
};
