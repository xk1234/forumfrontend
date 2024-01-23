import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

interface Post {
    ID: number;
    title: string;
    content: string;
    topic: string;
  }
  
  interface EditPostDialogProps {
    open: boolean;
    post: Post;
    onSave: (sort: string) => void;
    onClose: () => void;
  }

const EditPostDialog: React.FC<EditPostDialogProps> = ({ open, post, onSave, onClose }) => {
  const [updatedTitle, setUpdatedTitle] = useState(post.title);
  const [updatedContent, setUpdatedContent] = useState(post.content);
  const [updatedTopic, setUpdatedTopic] = useState(post.topic);

  useEffect(() => {
    setUpdatedTitle(post.title);
    setUpdatedContent(post.content);
    setUpdatedTopic(post.topic);
  }, [post]);

  const handleSave = () => {
    const updatedPost = {
      ...post,
      title: updatedTitle,
      content: updatedContent,
      topic: updatedTopic
    };
    handleSavePost(updatedPost);
  };

  const handleSavePost = (updatedPost: Post) => {
    fetch(`https://forumapi-dp4z.onrender.com/api/posts/${updatedPost.ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify(updatedPost)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      onClose();
      onSave("newest");
    })
    .catch(error => {
      console.error('Error updating post:', error);
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          type="text"
          fullWidth
          variant="outlined"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Content"
          type="text"
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          value={updatedContent}
          onChange={(e) => setUpdatedContent(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Topic"
          type="text"
          fullWidth
          variant="outlined"
          value={updatedTopic}
          onChange={(e) => setUpdatedTopic(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => handleSave()}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPostDialog;
