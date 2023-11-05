import React from 'react';
import theme from './assets/theme';
import { ThemeProvider } from '@mui/material/styles';
import RegisterModal from './components/RegisterModal';
import LoginModal from './components/LoginModal';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { Navbar } from './components/Navbar';

import { AllListingsPage } from './pages/AllListingsPage';
import { BookingsPage } from './pages/BookingsPage';
import { EditListingPage } from './pages/EditListingPage';
import { ListingPage } from './pages/ListingPage';
import { HostedListingsPage } from './pages/HostedListingsPage';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginModal />} />
          <Route path="/register" element={<RegisterModal />} />
          <Route path='/my-listings' element={<MyListingsPage />} />
          <Route path='/edit/:listingId' element={<EditListingPage />} />
          <Route path='/' element={<AllListingsPage />} />
          <Route path='/listings' element={<Navigate to='/' replace />} />
          <Route path='/listings/:listingId' element={<ListingPage />} />
          <Route path='/bookings/:listingId' element={<BookingsPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
