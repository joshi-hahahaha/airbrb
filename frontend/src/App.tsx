import React, { useState } from 'react';
import theme from './assets/theme';
import { ThemeProvider } from '@mui/material/styles';
import RegisterModal from './components/RegisterModal';
import Logo from './assets/airbrbLogo';

function App () {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Logo />
        <button onClick={handleOpen}>Open Register</button>
        <RegisterModal open={modalOpen} onClose={handleClose} />
      </ThemeProvider>
    </div>
  );
}

export default App;
