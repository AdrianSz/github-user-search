import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroller';
import { UserCard } from './UserCard';

interface User {
  login: string;
  avatar_url: string;
  html_url: string;
  type: string;
}

interface UserListProps {
  users: User[];
  hasMore: boolean;
  isLoading: boolean;
  error: Error | null;
  onLoadMore: () => void;
}

export const UserList: React.FC<UserListProps> = ({
  users,
  hasMore,
  isLoading,
  error,
  onLoadMore,
}) => {
  const [hasSearched, setHasSearched] = React.useState(false);

  React.useEffect(() => {
    if (isLoading) {
      setHasSearched(true);
    }
  }, [isLoading]);

  if (error) {
    return (
      <Typography color="error" align="center">
        Error: {error.message}
      </Typography>
    );
  }

  if (!isLoading && hasSearched && users.length === 0) {
    return (
      <Typography align="center">
        No users found. Try a different search term.
      </Typography>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
      <InfiniteScroll
        pageStart={0}
        loadMore={onLoadMore}
        hasMore={hasMore}
        loader={
          <Box key="loader" sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress />
          </Box>
        }
      >
        {users.map((user) => (
          <Box key={user.login} sx={{ mb: 2 }}>
            <UserCard user={user} />
          </Box>
        ))}
      </InfiniteScroll>
    </Box>
  );
}; 