import React, { useContext } from 'react';
import { navBar } from '../../styles/navbar/navBarStyle';
import Logo from '../../assets/airbrbLogo';
import { SearchBar } from './SearchBar';
import AuthContext from '../../contexts/AuthContext';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const NavBar: React.FC = () => {
  const { authToken, logout } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleLoginBtn = () => {
    navigate('/login');
  };
  const handleSignupBtn = () => {
    navigate('/register');
  };

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
            <Button variant='outlined' onClick={handleLoginBtn}>
              Login
            </Button>
            <Button variant='outlined' onClick={handleSignupBtn}>
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
