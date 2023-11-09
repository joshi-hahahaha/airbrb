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
        {/*eslint-disable*/}
        {authToken ? (
          <Button onClick={logout} variant='outlined'>
            Logout
          </Button>
        ) : (
          <div>
            <Button variant='outlined'>Login</Button>
            <Button variant='outlined'>Login</Button>
          </div>
        )}
      </div>
    </nav>
  );
};
