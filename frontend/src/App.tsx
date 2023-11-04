import React, { useState } from 'react';
import theme from './assets/theme';
import { ThemeProvider } from '@mui/material/styles';
import RegisterModal from './components/RegisterModal';
import Logo from './assets/airbrbLogo';
import LoginModal from './components/LoginModal';
import { ListingPage } from './pages/ListingPage';

const App = () => {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleRegisterOpen = () => setRegisterModalOpen(true);
  const handleLoginOpen = () => setLoginModalOpen(true);

  const handleRegisterClose = () => setRegisterModalOpen(false);
  const handleLoginClose = () => setLoginModalOpen(false);

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <ListingPage></ListingPage>
        <Logo />
        <button onClick={handleRegisterOpen}>Open Register</button>
        <button onClick={handleLoginOpen}>Open Login</button>
        <RegisterModal open={registerModalOpen} onClose={handleRegisterClose} />
        <LoginModal open={loginModalOpen} onClose={handleLoginClose} />
      </ThemeProvider>
    </div>
  );
};

export default App;
