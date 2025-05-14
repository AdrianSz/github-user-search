import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGitHubSearch } from './useGitHubSearch';

// Mock fetch
global.fetch = jest.fn();

describe('useGitHubSearch', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    (global.fetch as jest.Mock).mockClear();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  it('should fetch users', async () => {
    const mockUsers = [
      { id: 1, login: 'user1', avatar_url: 'url1', html_url: 'html1', type: 'User', score: 1 },
      { id: 2, login: 'user2', avatar_url: 'url2', html_url: 'html2', type: 'User', score: 0.9 },
    ];

    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ items: mockUsers, total_count: 2 }),
      })
    );

    const { result } = renderHook(() => useGitHubSearch(), { wrapper });

    // Initial state
    expect(result.current.users).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();

    // Search users
    await act(async () => {
      await result.current.searchUsers('test');
    });

    // Wait for React Query to finish
    await waitFor(() => {
      expect(result.current.users).toEqual(mockUsers);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle API errors', async () => {
    const errorMessage = 'API Error';
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    const { result } = renderHook(() => useGitHubSearch(), { wrapper });

    await act(async () => {
      await result.current.searchUsers('test');
    });

    await waitFor(() => {
      expect(result.current.error).toBeInstanceOf(Error);
    });

    expect(result.current.error?.message).toBe(errorMessage);
    expect(result.current.users).toEqual([]);
  });

  it('should handle empty search results', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ items: [], total_count: 0 }),
      })
    );

    const { result } = renderHook(() => useGitHubSearch(), { wrapper });

    await act(async () => {
      await result.current.searchUsers('nonexistent');
    });

    await waitFor(() => {
      expect(result.current.users).toEqual([]);
    });

    expect(result.current.error).toBeNull();
  });
}); 