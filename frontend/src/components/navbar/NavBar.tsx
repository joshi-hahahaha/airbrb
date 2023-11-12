import React from 'react';
import { navBar } from '../../styles/navbar/navBarStyle';
import { SearchBar } from './SearchBar';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserMenu } from './UserMenu';
import Logo from '../../assets/airbrbLogo';

export const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const handleLogoBtn = () => {
    navigate('/');
  };

  return (
    <nav style={navBar}>
      <Button onClick={handleLogoBtn}>
        <Logo />
      </Button>
      <SearchBar />
      <UserMenu />
    </nav>
  );
};
