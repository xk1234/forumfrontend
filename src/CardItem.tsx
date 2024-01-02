import React from 'react';
import { Card, CardContent, Typography, CardActions, Box } from '@mui/material';

interface CardItemProps {
  title: string;
  preview: string;
  date: string;
  iconUrl: string;
  onClick: () => void;
}

const CardItem: React.FC<CardItemProps> = ({ title, preview, date, onClick }) => {
    return (
      <Card sx={{
        display: 'block',
        fontSize: '14px',
        lineHeight: '20px',
        margin: '0 -10px',
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
              {preview}
            </Typography>
          </CardContent>
          <CardActions sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <Typography>{date}</Typography>
          </CardActions>
        </Box>
      </Card>
    );
  };

export default CardItem;
