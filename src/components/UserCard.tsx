import React from 'react';
import { Card, CardContent, Typography, Box, Link } from '@mui/material';

interface User {
  login: string;
  avatar_url: string;
  html_url: string;
  type: string;
}

interface UserCardProps {
  user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <Card 
      sx={{ 
        display: 'flex',
        p: 2,
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3,
          transition: 'all 0.2s ease-in-out',
        },
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        mr: 2
      }}>
        <img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
      </Box>
      <CardContent sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1
      }}>
        <Typography variant="h6" gutterBottom sx={{ 
          letterSpacing: '0.5px',
          fontWeight: 600
        }}>
          {user.login}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ 
          letterSpacing: '0.3px',
          mb: 1
        }}>
          {user.type}
        </Typography>
        <Link
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: 'primary.main',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
            mt: 1
          }}
        >
          Zobacz profil
        </Link>
      </CardContent>
    </Card>
  );
}; 