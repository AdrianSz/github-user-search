import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GitHubSearch } from './components/GitHubSearch';
import { theme } from './theme';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GitHubSearch />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
