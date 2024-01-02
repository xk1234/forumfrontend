import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

interface TopToolbarProps {
    onLoginClick: () => void;
  }

const TopToolbar: React.FC<TopToolbarProps> = ({onLoginClick}) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          NUS Forum
        </Typography>
        <Button color="inherit" onClick={onLoginClick}>Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default TopToolbar;
