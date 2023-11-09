import React from 'react';
import { contentContainer, page } from '../styles/pageStyles';
import { formContentDiv } from '../styles/addListing/addListingStyle';

export const AddListingPage: React.FC = () => {
  return (
    <div style={page}>
      <div style={contentContainer}>
        <div style={formContentDiv}>
          <div>form div</div>
          <div>form div</div>
        </div>
      </div>
    </div>
  );
};
