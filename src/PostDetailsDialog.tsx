import React from 'react';
import { Divider, Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button } from '@mui/material';

interface PostDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  date: string;
  comments: string[];
}

const PostDetailsDialog: React.FC<PostDetailsDialogProps> = ({ open, onClose, title, description, date, comments }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1">{description}</Typography>
        <Typography variant="subtitle2">{date}</Typography>
        <Divider sx={{marginBottom: "1em"}} />
        <Typography variant="body1" gutterBottom>
          Comments:
        </Typography>
        {comments.map((comment, index) => (
          <Typography key={index} variant="body2" paragraph>
            {comment}
          </Typography>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostDetailsDialog;
