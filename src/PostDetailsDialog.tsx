import React, { useEffect, useState, useCallback } from "react";
import {
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Chip,
  DialogActions,
  Button,
  TextField,
  Box
} from "@mui/material";
import EditCommentDialog from "./EditCommentDialog";
import EditPostDialog from "./EditPostDialog";
interface PostDetailsDialogProps {
  uid: number;
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  date: string;
  postId: number;
  onPostDeleted: (sort: string) => void;
  topic: string;
  topicl: string[];
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

const PostDetailsDialog: React.FC<PostDetailsDialogProps> = ({
  open,
  onClose,
  title,
  description,
  date,
  postId,
  uid,
  onPostDeleted,
  topic,
  topicl,
}) => {
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  const fetchComments = useCallback(() => {
    fetch(`https://forumapi-dp4z.onrender.com/public/comments/${postId}`)
      .then((response) => response.json())
      .then((data) => setCommentList(data.response))
      .catch((error) => console.error("Error fetching comments:", error));
  }, [postId]);
  useEffect(() => {
    if (open) {
      fetchComments();
    }
  }, [open, fetchComments]);

  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [editPostDialogOpen, setEditPostDialogOpen] = useState<boolean>(false);
  const [currentComment, setCurrentComment] = useState<Comment | null>(null);

  const handleEditClick = (comment: Comment) => {
    setCurrentComment(comment);
    setEditDialogOpen(true);
  };

  const handleDelete = () => {
    fetch(`https://forumapi-dp4z.onrender.com/api/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        onPostDeleted("newest");
        onClose();
      })
      .catch((error) => {
        console.error("Error deleting the post:", error);
      });
  };

  const handleDeleteComment = (cid: number) => {
    fetch(`https://forumapi-dp4z.onrender.com/api/comments/${cid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        fetchComments();
      })
      .catch((error) => {
        console.error("Error deleting the comment:", error);
      });
  };

  const handleCommentSubmit = () => {
    fetch(`https://forumapi-dp4z.onrender.com/api/comments/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({ content: newComment }),
    })
      .then((response) => response.json())
      .then(() => {
        setNewComment("");
        fetchComments();
      })
      .catch((error) => console.error("Error posting comment:", error));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
       sx={{
        minHeight: '100px', // Adjust this as needed
        maxHeight: '250px', // Set a maximum height for the content
        overflowY: 'auto'
      }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          {topicl.map((tag: string, index: number) => (
            <Chip key={index} label={tag} />
          ))}
        </Box>
        {uid === parseInt(localStorage.getItem("uid") || "0", 10) ? (
          <Box sx={{
            width: "200px"
          }}>
            <Button onClick={() => setEditPostDialogOpen(true)}>Edit</Button>
            <Button onClick={handleDelete}>Delete</Button>
          </Box>
        ) : (
          ""
        )}
        </Box>
        <Typography variant="subtitle1">{description}</Typography>
        <Typography variant="subtitle2">{"Posted: " + date}</Typography>
        <Divider sx={{ marginBottom: "1em" }} />
        <Typography variant="body1" gutterBottom>
          {"Comments(" + commentList.length + "): "}
        </Typography>
        {commentList.map((comment: Comment, index: number) => (
          <Typography
            key={index}
            variant="body2"
            paragraph
            style={{
              backgroundColor:
                comment.user_id ===
                parseInt(localStorage.getItem("uid") || "0", 10)
                  ? "#ffeb3b"
                  : "inherit",
            }}
          >
            {new Date(comment.CreatedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }) +
              ": " +
              comment.content}
            {comment.user_id ===
            parseInt(localStorage.getItem("uid") || "0", 10) ? (
              <Box>
                <Button onClick={() => handleEditClick(comment)}>Edit</Button>
                <Button onClick={() => handleDeleteComment(comment.ID)}>
                  Delete
                </Button>
              </Box>
            ) : (
              ""
            )}
          </Typography>
        ))}
      </DialogContent>
      <DialogContent>
        {localStorage.getItem("username") ? (
          <>
            <Typography variant="body1" gutterBottom>
              Add Comment:
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              multiline
              rows={4}
            />
            <Button onClick={handleCommentSubmit} color="primary">
              Submit Comment
            </Button>
          </>
        ) : (
          <>
            <Typography variant="body1" gutterBottom>
              Login To Comment
            </Typography>
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
      {currentComment && (
        <EditCommentDialog
          open={editDialogOpen}
          comment={currentComment}
          onSave={fetchComments}
          onClose={() => setEditDialogOpen(false)}
        />
      )}
      <EditPostDialog
        post={{ title: title, content: description, ID: postId, topic: topic }}
        open={editPostDialogOpen}
        onSave={onPostDeleted}
        onClose={() => {
          setEditPostDialogOpen(false);
          onClose();
        }}
      />
    </Dialog>
  );
};

export default PostDetailsDialog;
