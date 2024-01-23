import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

interface EditCommentDialogProps {
    open: boolean;
    comment: Comment;
    onSave: () => void;
    onClose: () => void;
  }

  interface Comment {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    content: string;
    user_id: number;
    post_refer: number;
    user: {
      ID: number;
      CreatedAt: string;
      UpdatedAt: string;
      DeletedAt: string | null;
      username: string;
    };
  }
const EditCommentDialog: React.FC<EditCommentDialogProps> = ({ open, comment, onSave, onClose }) => {
  const [updatedContent, setUpdatedContent] = useState(comment.content);

  
  useEffect(() => {
    setUpdatedContent(comment.content);
  }, [comment]);

  const handleSaveComment = (commentId: number, updatedContent: string) => {
    fetch(`https://forumapi-dp4z.onrender.com/api/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({ content: updatedContent })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      onClose();
      setUpdatedContent('');
      onSave();
    })
    .catch(error => {
      console.error('Error updating comment:', error);
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Comment</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          multiline
          variant="outlined"
          value={updatedContent}
          onChange={(e) => setUpdatedContent(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => handleSaveComment(comment.ID, updatedContent)}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCommentDialog;