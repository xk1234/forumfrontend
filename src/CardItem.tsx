import React from 'react';
import { Card, CardContent, Typography, CardActions, Box, Chip } from '@mui/material';

interface User {
    ID: number,
    CreatedAt:string,
    UpdatedAt:string,
    DeletedAt:null,
    username:string,
}
interface CardItemProps {
    ID: number,
  title: string;
  content: string;
  CreatedAt: string;
  UpdatedAt: string;
  user: User;
  isop: boolean;
  onClick: () => void;
  date: string;
  topicl: string[];
}

const truncateString = (str:string, num:number) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  };

const CardItem: React.FC<CardItemProps> = ({ ID, title, content, CreatedAt, onClick, isop, date, topicl }) => {
    return (
      <Card sx={{
        display: 'block',
        fontSize: '14px',
        lineHeight: '20px',
        margin: '0 -10px',
        backgroundColor: isop ? '#ffeb3b' : 'inherit',
        '&:hover': {
          backgroundColor: '#f5f5f5',
          textDecoration: 'none',
          userSelect: 'none',
        }
      }} onClick={onClick}>
        <Box>
          <CardContent>
            <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>
              {title}
            </Typography>
            <Typography sx={{
              fontSize: '13px',
              lineHeight: '19px',
              maxHeight: '38px',
              color: '#000',
            }}>
              {truncateString(content, 100)}
            </Typography>
          </CardContent>
          <CardActions sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <Typography>{date}</Typography>
            <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          {topicl.map((tag: string, index: number) => (
            <Chip key={index} label={tag} />
          ))}
        </div>
          </CardActions>
        </Box>
      </Card>
    );
  };

export default CardItem;
