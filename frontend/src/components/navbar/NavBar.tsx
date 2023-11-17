import React from 'react';
import Logo from '../../assets/airbrbLogo';
import { SearchBar } from './SearchBar';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { UserMenu } from './UserMenu';

export const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleLogoBtn = () => {
    navigate('/');
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar>
      <Toolbar sx={{ backgroundColor: 'white', color: 'black' }}>
        <IconButton edge="start" color="inherit" onClick={handleLogoBtn} aria-label="logo">
          <Logo />
        </IconButton>
        {!isMobile && (
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <SearchBar />
          </Box>
        )}
        {!isMobile && <UserMenu />}
        {isMobile && (
          <>
            <IconButton edge="end" color="primary" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem><SearchBar /></MenuItem>
              <MenuItem><UserMenu /></MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
