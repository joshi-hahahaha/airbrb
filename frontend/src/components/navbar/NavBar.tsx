import React, { useContext } from 'react';
import { navBar } from '../../styles/navbar/navBarStyle';
import Logo from '../../assets/airbrbLogo';
import { SearchBar } from './SearchBar';
import AuthContext from '../../contexts/AuthContext';
import { Button } from '@mui/material';

export const NavBar: React.FC = () => {
  const { authToken, logout } = useContext(AuthContext);

  return (
    <nav style={navBar}>
      <Logo />
      <SearchBar />
      <div>
        {authToken
          ? (
          <Button onClick={logout} variant='outlined'>
            Logout
          </Button>
            )
          : (
          <Button onClick={logout} variant='outlined'>
            Login
          </Button>
            )}
      </div>
    </nav>
  );
};
