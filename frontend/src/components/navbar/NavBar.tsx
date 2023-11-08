import React, { useContext } from 'react';
import { navBar } from '../../styles/navbar/navBarStyle';
import Logo from '../../assets/airbrbLogo';
import { SearchBar } from './SearchBar';
import AuthContext from '../../contexts/AuthContext';

export const NavBar: React.FC = () => {
  const { logout } = useContext(AuthContext);

  return (
    <nav style={navBar}>
      <Logo />
      <SearchBar />
      <div>
        buttons
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
};
