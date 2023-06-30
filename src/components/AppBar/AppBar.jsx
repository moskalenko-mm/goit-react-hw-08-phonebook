import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from 'redux/selector';
import { logout } from 'redux/auth/authOperations';
import Loader from 'components/Loader/Loader';
import { Suspense } from 'react';

export const MenuAppBar = () => {
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = event => {
    event.target.textContent === 'Logout' ? dispatch(logout()) : navigate('/');
  };
  return (
    <Box sx={{ flexGrow: 1, alignItems: 'center' }}>
      <AppBar position="static" sx={{ justifyItems: 'center' }}>
        <Toolbar>
          {!isLoggedIn && (
            <Typography
              variant="h6"
              component="a"
              href="/goit-react-hw-08-phonebook"
              sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
            >
              Home
            </Typography>
          )}
          {isLoggedIn && (
            <Typography
              variant="h6"
              component="a"
              href="/goit-react-hw-08-phonebook/contacts"
              sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
            >
              Contacts
            </Typography>
          )}
          {user && <Typography>{user.email}</Typography>}
          {user.email && (
            <Button onClick={handleClick} color="inherit">
              Logout
            </Button>
          )}
          {!user.email && (
            <Button onClick={handleClick} color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </Box>
  );
};

export default MenuAppBar;
