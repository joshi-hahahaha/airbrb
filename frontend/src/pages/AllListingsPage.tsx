import React from 'react';
import { allListingsPage } from '../styles/allListingsPageStyles';
import { Link } from 'react-router-dom';

export const AllListingsPage = () => {
  return <div style={allListingsPage}>
    <Link to="/register">Open Register</Link>
    <Link to="/login">Open Login</Link>
  </div>;
};
