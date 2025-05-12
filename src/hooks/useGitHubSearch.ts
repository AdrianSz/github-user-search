import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { User } from '../types/user';

interface GitHubResponse {
  items: User[];
  total_count: number;
}

export const useGitHubSearch = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['users', searchTerm],
    queryFn: async ({ pageParam = 1 }) => {
      if (!searchTerm) return { items: [], total_count: 0 };
      const response = await fetch(
        `https://api.github.com/search/users?q=${searchTerm}&page=${pageParam}&per_page=10`,
        {
          headers: {
            'Accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
          }
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return response.json() as Promise<GitHubResponse>;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: GitHubResponse, allPages: GitHubResponse[]) => {
      const nextPage = allPages.length + 1;
      return lastPage.items.length === 10 ? nextPage : undefined;
    },
    enabled: !!searchTerm,
  });

  const users = React.useMemo(
    () => data?.pages.flatMap((page: GitHubResponse) => page.items) ?? [],
    [data]
  );

  const searchUsers = async (query: string) => {
    setSearchTerm(query);
  };

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return {
    users,
    hasMore: !!hasNextPage,
    isLoading: isFetching && !isFetchingNextPage,
    error,
    searchUsers,
    loadMore,
  };
}; 