import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { SearchForm } from './SearchForm';
import { UserList } from './UserList';
import { useGitHubSearch } from '../hooks/useGitHubSearch';
import { MESSAGES } from '../constants/messages';

export const GitHubSearch: React.FC = () => {
  const { users, hasMore, isLoading, error, searchUsers, loadMore } = useGitHubSearch();
  const [isWaiting, setIsWaiting] = React.useState(false);
  const [showResults, setShowResults] = React.useState(false);

  const handleSearch = async (query: string) => {
    setIsWaiting(true);
    setShowResults(false);
    
    try {
      await searchUsers(query);
      await new Promise(resolve => setTimeout(resolve, 2000));
    } finally {
      setIsWaiting(false);
      setShowResults(true);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <SearchForm onSearch={handleSearch} error={error} isLoading={isLoading} />
      </Box>

      {isWaiting && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {showResults && (
        <>
          {users.length > 0 ? (
            <UserList
              users={users}
              hasMore={hasMore}
              isLoading={isLoading}
              error={error}
              onLoadMore={loadMore}
            />
          ) : (
            <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>
              {MESSAGES.SEARCH.NO_RESULTS}
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};