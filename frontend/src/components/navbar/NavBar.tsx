import React from 'react';
import { navBar } from '../../styles/navbar/navBarStyle';
import Logo from '../../assets/AirbrbLogo';
import { SearchBar } from './SearchBar';

export const NavBar: React.FC = () => {
  return (
    <nav style={navBar}>
      <Logo />
      <SearchBar />
      <div>buttons</div>
    </nav>
  );
};
