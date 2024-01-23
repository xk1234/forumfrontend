import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import TopToolbar from "./Toolbar";
import CardItem from "./CardItem";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import AddPostDialog from "./AddPostDialog";
import {
  Container,
  Grid,
  Box,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import PostDetailsDialog from "./PostDetailsDialog";
import { PostfixUnaryExpression } from "typescript";
import { request } from "http";

interface User {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null;
  username: string;
}
interface Post {
  ID: number;
  title: string;
  content: string;
  CreatedAt: string;
  UpdatedAt: string;
  user: User;
  topic: string;
  topicl: string[];
  date: string;
}

function App() {
  const [cards, setCards] = useState<Post[]>([]);
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isPostPopupOpen, setPostPopupOpen] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [signupError, setSignupError] = useState('');
  const [isSignupPopupOpen, setSignupPopupOpen] = useState(false);

  const fetchPosts = (sortorder: string) => {
    setSortOrder(sortorder);
    fetch("https://forumapi-dp4z.onrender.com/public/posts?sort=" + sortorder)
      .then((response) => {
        if (!response.ok) {
            alert("Error when fetching Posts")
          throw new Error("Failed");
        }
        return response.json();
      })
      .then((data) => {
        const updatedPosts = data.response.map((post: Post) => {
            return {
              ...post,
              date: new Date(post.CreatedAt).toLocaleDateString("en-US", {
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit'
              }),
              topicl: post.topic ? post.topic.split(',') : [] 
            };
          });
        setCards(updatedPosts as Post[]);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  useEffect(() => {
    fetchPosts("newest");
    if (localStorage.getItem("username")) {
        setUser(localStorage.getItem("username"));
    }
  }, []);

  const handlePostButtonClick = () => {
    setPostPopupOpen(true);
  };

  const handleLoginButtonClick = () => {
    setLoginPopupOpen(true);
  };

  const handleLogin = (username: string) => {
    const requestBody = {
      username: username,
    };

    fetch("https://forumapi-dp4z.onrender.com/public/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.error) {
            setLoginError(data.error);
            localStorage.setItem("jwt", '');
            localStorage.setItem("uid", '');
            localStorage.setItem("username", '');
        } else {
            console.log(data);
            const jwt = data.jwt;
            localStorage.setItem("jwt", jwt);
            localStorage.setItem("uid", data.ID);
            localStorage.setItem("username", data.username);
            setUser(username);
            setLoginPopupOpen(false);
            setLoginError('');
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  const handleLogout = () => {
    localStorage.setItem("jwt", '');
    localStorage.setItem("uid", '');
    localStorage.setItem("username", '');
    setUser(localStorage.getItem("username"));
  }

  const handleLoginPopupClose = () => {
    setLoginPopupOpen(false);
  };

  const handleSignupButtonClick = () => {
    setSignupPopupOpen(true);
  };

  const handleSignup = (username: string) => {
    const requestBody = {
      username: username,
    };

    fetch("https://forumapi-dp4z.onrender.com/public/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data)
        if (data.error) {
            setSignupError('Username Already Taken');
            localStorage.setItem("jwt", '');
            localStorage.setItem("uid", '');
            localStorage.setItem("username", '');
        } else {
            handleLogin(data.username)
            setSignupPopupOpen(false);
        }
      })
      .catch((error) => {
        console.error("Signup error:", error);
      });
  };

  const handleSignupPopupClose = () => {
    setSignupPopupOpen(false);
  };



  const handlePostPopupClose = () => {
    setPostPopupOpen(false);
  };

  const [sortOrder, setSortOrder] = useState("newest");

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const newSortOrder = event.target.value as string;
    setSortOrder(newSortOrder);
    fetchPosts(newSortOrder);
    
  };

  const handleCardClick = (post: Post) => {
    setSelectedPost(post);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <div className="App">
      <LoginForm
        open={isLoginPopupOpen}
        onLogin={handleLogin}
        onClose={handleLoginPopupClose}
        errorMessage={loginError}
      />
      <SignupForm
        open={isSignupPopupOpen}
        onSignup={handleSignup}
        onClose={handleSignupPopupClose}
        errorMessage={signupError}
      />
      <AddPostDialog
        open={isPostPopupOpen}
        onClose={handlePostPopupClose}
        onPostAdded={fetchPosts}
      />
      <TopToolbar
      onLogout={handleLogout}
        onLoginClick={handleLoginButtonClick}
        onSignupClick={handleSignupButtonClick}
        user={user}
        onPostClick={handlePostButtonClick}
      />
      <Container sx={{ width: "600px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <Typography variant="h6">Number of Posts: {cards.length}</Typography>
          <Select
            value={sortOrder}
            onChange={handleSortChange}
            displayEmpty
          >
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
            <MenuItem value="mostComments">Most Comments</MenuItem>
          </Select>
        </Box>
        <Grid container spacing={2}>
          {cards.map((card, index) => (
            <Grid item xs={12} key={index}>
              <CardItem {...card} onClick={() => handleCardClick(card)} isop={card.user.ID === parseInt(localStorage.getItem("uid") || "0", 10)} />
            </Grid>
          ))}
        </Grid>
      </Container>
      {selectedPost && (
        <PostDetailsDialog
        uid={selectedPost.user.ID}
          open={dialogOpen}
          onClose={handleDialogClose}
          title={selectedPost.title}
          description={selectedPost.content}
          postId={selectedPost.ID}
          date={selectedPost.date}
          onPostDeleted={fetchPosts}
          topicl={selectedPost.topicl}
          topic={selectedPost.topic}
        />
      )}
    </div>
  );
}

export default App;
