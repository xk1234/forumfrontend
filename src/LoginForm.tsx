import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Typography } from '@mui/material';

interface LoginPopupProps {
  open: boolean;
  onLogin: (username: string) => void;
  onClose: () => void;
  errorMessage?: string;
}

const LoginForm: React.FC<LoginPopupProps> = ({ open, onLogin, onClose,errorMessage  }) => {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    onLogin(username);
    setUsername('');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="username"
          label="Username"
          type="text"
          fullWidth
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errorMessage && (
          <Typography color="error" variant="body2" style={{ marginTop: '10px' }}>
            {errorMessage}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
      <Button onClick={handleLogin} color="primary">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginForm;
