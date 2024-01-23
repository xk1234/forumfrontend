import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface SignupPopupProps {
  open: boolean;
  onSignup: (username: string) => void;
  onClose: () => void;
  errorMessage?: string;
}

const SignupForm: React.FC<SignupPopupProps> = ({
  open,
  onSignup,
  onClose,
  errorMessage,
}) => {
  const [username, setUsername] = useState("");

  const handleSignup = () => {
    onSignup(username);
    setUsername("");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Signup</DialogTitle>
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
          <Typography
            color="error"
            variant="body2"
            style={{ marginTop: "10px" }}
          >
            {errorMessage}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSignup} color="primary">
          Sign Up
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignupForm;
