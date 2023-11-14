import React from 'react';

import { ListingHeaderProps } from '../../pages/ListingPage';

export const ListingReserveForm: React.FC<ListingHeaderProps> = ({
  listing,
}) => {
  console.log(listing);
  return <div style={{ width: '40%' }}>reserve</div>;
};
