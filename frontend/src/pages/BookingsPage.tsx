import React from 'react';
import { page } from '../styles/pageStyles';
import { useParams } from 'react-router-dom';

export const BookingsPage = () => {
  const params = useParams();
  console.log(params);

  return <div style={page}>

  </div>;
};
