import React from 'react';
import { contentContainer, page } from '../styles/pageStyles';
import { formContentDiv } from '../styles/addListing/addListingStyle';
import { AddListingForm } from '../components/addListing/AddListingForm';

export const AddListingPage: React.FC = () => {
  return (
    <div style={page}>
      <div style={contentContainer}>
        <div style={formContentDiv}>
          <AddListingForm />
        </div>
      </div>
    </div>
  );
};
