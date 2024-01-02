import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import TopToolbar from "./Toolbar";
import CardItem from "./CardItem";
import LoginForm from "./LoginForm";
import { Container, Grid, Box, Typography, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import PostDetailsDialog from './PostDetailsDialog';

interface Post {
    title: string;
    preview: string;
    date: string;
    iconUrl: string;
    comments: string[];
  }

function App() {
    const cards = [
        {
          title: "Study Group for Calculus 101",
          preview: "Looking to form a study group for Calculus 101. Anyone interested in joining, please reply!",
          date: "2023-09-05",
          iconUrl: "https://via.placeholder.com/150",
          comments: [
            "I'm interested! Struggling with integrals and could use some help.",
            "Count me in. I did well last semester and can share my notes.",
            "What days are you planning to meet?"
          ]
        },
        {
          title: "Best Cafes on Campus for Studying?",
          preview: "Can anyone recommend quiet cafes on campus that are great for studying? Preferably with good coffee!",
          date: "2023-09-10",
          iconUrl: "https://via.placeholder.com/150",
          comments: [
            "The Green Bean has great coffee and plenty of space. It's usually quiet in the mornings.",
            "I like the library café. Good coffee and really peaceful.",
            "Café 101 is a bit crowded but has the best espresso shots."
          ]
        },
        {
          title: "Textbook Exchange",
          preview: "I have textbooks from last semester that I'm looking to exchange. Anyone interested?",
          date: "2023-08-30",
          iconUrl: "https://via.placeholder.com/150",
          comments: [
            "I need a textbook for Biology 101, do you have it?",
            "I have some engineering books to exchange. Let's connect!",
            "Is your calculus textbook still available?"
          ]
        },
        {
          title: "Internship Opportunities in Computer Science",
          preview: "Does anyone have tips on finding internship opportunities in computer science for the summer?",
          date: "2023-09-12",
          iconUrl: "https://via.placeholder.com/150",
          comments: [
            "Check out the career center's website, they post new opportunities every week.",
            "I got my internship through LinkedIn. Make sure your profile is up-to-date!",
            "Attend the upcoming tech meet-up. Great for networking and finding leads."
          ]
        },
        {
          title: "Advice for Freshmen",
          preview: "Starting my first year and feeling a bit overwhelmed. Any advice from senior students?",
          date: "2023-09-01",
          iconUrl: "https://via.placeholder.com/150",
          comments: [
            "Join clubs and societies to meet new people. It helps a lot!",
            "Don't buy all the textbooks before classes start. Wait and see what you really need.",
            "Time management is key. Find a balance between studies and social life."
          ]
        },
      ];
      
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleLoginButtonClick = () => {
    setLoginPopupOpen(true);
  };

  const handleLogin = (username: string) => {
    setUser(username);
    setLoginPopupOpen(false);
  };

  const handleLoginPopupClose = () => {
    setLoginPopupOpen(false);
  };

  const [sortOrder, setSortOrder] = useState('newest');

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortOrder(event.target.value as string);
    // Add sorting logic here
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
      />
      <TopToolbar onLoginClick={handleLoginButtonClick} />
      <Container sx={{ width: "600px" }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
        <Typography variant="h6">Number of Posts: {cards.length}</Typography>
        <Select
          value={sortOrder}
          onChange={handleSortChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="newest">Newest</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
          <MenuItem value="mostComments">Most Comments</MenuItem>
        </Select>
      </Box>
        <Grid container spacing={2}>
          {cards.map((card, index) => (
            <Grid item xs={12} key={index}>
              <CardItem {...card} onClick={() => handleCardClick(card)} />
            </Grid>
          ))}
        </Grid>
      </Container>
      {selectedPost && (
        <PostDetailsDialog
          open={dialogOpen}
          onClose={handleDialogClose}
          title={selectedPost.title}
          description={selectedPost.preview}
          date={selectedPost.date}
          comments={selectedPost.comments} // Assuming each post has a 'comments' array
        />
      )}
    </div>
  );
}

export default App;
