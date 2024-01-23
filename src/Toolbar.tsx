import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

interface TopToolbarProps {
    onLoginClick: () => void;
    onSignupClick: () => void;
    onPostClick: () => void;
    user: string | null;
    onLogout: () => void;
  }

const TopToolbar: React.FC<TopToolbarProps> = ({onLoginClick, onPostClick, user, onSignupClick, onLogout}) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          NUS Forum
        </Typography>
        {
        user ? (
            <>
            <Button color="inherit" onClick={onPostClick}>Post</Button>
            <Typography>Welcome, {user}!</Typography>
            <Button color="inherit" onClick={onLogout}>Logout</Button>
          </>
        ) : (
            <><Button color="inherit" onClick={onLoginClick}>Login</Button>
            <Button color="inherit" onClick={onSignupClick}>Sign Up</Button></>
        )
      }
      </Toolbar>
    </AppBar>
  );
};

export default TopToolbar;
