import React from 'react';
import { listingPage } from '../styles/listPageStyle';
import { Link } from 'react-router-dom';

export const ListingPage = () => {
  return <div style={listingPage}>
    <Link to="/register">Open Register</Link>
    <Link to="/login">Open Login</Link>
  </div>;
};
