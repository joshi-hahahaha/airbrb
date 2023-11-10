import {
  AddHome,
  House,
  Login,
  Logout,
  OtherHouses,
  PersonAdd,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

export const UserMenu = () => {
  const { authToken, logout } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const handleLoginBtn = () => {
    navigate('/login');
  };
  const handleSignupBtn = () => {
    navigate('/register');
  };
  const handleMyListingsBtn = () => {
    navigate('/my-listings');
  };
  const handleAddListingBtn = () => {
    navigate('/add-listing');
  };
  const handleAllListingsBtn = () => {
    navigate('/');
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title='Account Settings'>
          <IconButton
            onClick={handleClick}
            size='small'
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar src='./../../assets/default-pfp.jpg' />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* eslint-disable */}
        {authToken ? (
          <div>
            <MenuItem onClick={logout}>
              <ListItemIcon>
                <Logout fontSize='small' />
              </ListItemIcon>
              Logout
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleAllListingsBtn}>
              <ListItemIcon>
                <OtherHouses fontSize='small' />
              </ListItemIcon>
              All Listings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleMyListingsBtn}>
              <ListItemIcon>
                <House fontSize='small' />
              </ListItemIcon>
              My Listings
            </MenuItem>
            <MenuItem onClick={handleAddListingBtn}>
              <ListItemIcon>
                <AddHome fontSize='small' />
              </ListItemIcon>
              Add Listing
            </MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem onClick={handleLoginBtn}>
              <ListItemIcon>
                <Login fontSize='small' />
              </ListItemIcon>
              Login
            </MenuItem>
            <MenuItem onClick={handleSignupBtn}>
              <ListItemIcon>
                <PersonAdd fontSize='small' />
              </ListItemIcon>
              Sign Up
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleAllListingsBtn}>
              <ListItemIcon>
                <OtherHouses fontSize='small' />
              </ListItemIcon>
              All Listings
            </MenuItem>
          </div>
        )}
      </Menu>
    </React.Fragment>
  );
};
