import React from 'react';
import theme from './assets/theme';
import { ThemeProvider } from '@mui/material/styles';
import RegisterModal from './components/authModals/RegisterModal';
import LoginModal from './components/authModals/LoginModal';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from './contexts/AuthProvider';
import { SearchProvider } from './contexts/SearchContext';

import { NavBar } from './components/navbar/NavBar';

import { AllListingsPage } from './pages/AllListingsPage';
import { BookingsPage } from './pages/BookingsPage';
import { EditListingPage } from './pages/EditListingPage';
import { ListingPage } from './pages/ListingPage';
import { MyListingsPage } from './pages/MyListingsPage';
import { AddListingPage } from './pages/AddListingPage';

import './fonts/SamsungSans-Light.ttf';
import './fonts/SamsungSans-Bold.ttf';
import './fonts/SamsungSans-Medium.ttf';
import './fonts/SamsungSans-Regular.ttf';
import './fonts/SamsungSans-Thin.ttf';

const App: React.FC = () => {
  return (
    <SearchProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <NavBar />
          <Routes>
            <Route path='/login' element={<LoginModal />} />
            <Route path='/register' element={<RegisterModal />} />
            <Route path='/my-listings' element={<MyListingsPage />} />
            <Route path='/add-listing' element={<AddListingPage />} />
            <Route path='/edit/:listingId' element={<EditListingPage />} />
            <Route path='/' element={<AllListingsPage />} />
            <Route path='/listings' element={<Navigate to='/' replace />} />
            <Route path='/listings/:listingId' element={<ListingPage />} />
            <Route path='/bookings/:listingId' element={<BookingsPage />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </SearchProvider>
  );
};

export default App;
