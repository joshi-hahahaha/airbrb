import React from 'react';
import { page } from '../styles/pageStyles';
import { Link } from 'react-router-dom';

export const AllListingsPage: React.FC = () => {
  return (
    <div style={page}>
      <Link to='/register'>Open Register</Link>
      <Link to='/login'>Open Login</Link>
    </div>
  );
};
