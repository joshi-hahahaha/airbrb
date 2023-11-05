import React from 'react';
import theme from './assets/theme';
import { ThemeProvider } from '@mui/material/styles';
import RegisterModal from './components/RegisterModal';
import LoginModal from './components/LoginModal';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { ListingPage } from './pages/ListingPage';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/register" element={<RegisterModal />} />
          <Route path="/login" element={<LoginModal />} />
          <Route path='/' element={<ListingPage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
