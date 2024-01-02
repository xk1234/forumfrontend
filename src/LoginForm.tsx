import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

interface LoginPopupProps {
  open: boolean;
  onLogin: (username: string) => void;
  onClose: () => void;
}

const LoginForm: React.FC<LoginPopupProps> = ({ open, onLogin, onClose }) => {
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
