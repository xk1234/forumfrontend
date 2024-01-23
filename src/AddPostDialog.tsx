import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

interface AddPostDialogProps {
  open: boolean;
  onClose: () => void;
  onPostAdded:(sort: string) => void;
}

const AddPostDialog: React.FC<AddPostDialogProps> = ({ open, onClose, onPostAdded }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [topics, setTopics] = useState('');

  const handleSubmit = () => {
    const postData = {
      title: title,
      content: content,
      topic: topics
    };

    fetch('https://forumapi-dp4z.onrender.com/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify(postData),
    })
    .then(response => {
      if (!response.ok) {
        alert("Error when sending post")
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
        setTitle('')
        setContent('')
        setTopics('')
        onPostAdded("newest");
      onClose();
    })
    .catch(error => {
      console.error('Error submitting post:', error);
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Post</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          id="content"
          label="Content"
          type="text"
          fullWidth
          variant="standard"
          multiline
          value={content}
          rows={4}
          onChange={(e) => setContent(e.target.value)}
        />
        <TextField
          margin="dense"
          id="topics"
          label="Topics (comma separated)"
          type="text"
          fullWidth
          variant="standard"
          value={topics}
          onChange={(e) => setTopics(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPostDialog;