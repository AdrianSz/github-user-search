export const MESSAGES = {
  SEARCH: {
    PLACEHOLDER: 'Enter GitHub username',
    BUTTON: 'Search',
    BUTTON_LOADING: 'Searching...',
    NO_RESULTS: 'No users found. Try a different search term.',
  },
  VALIDATION: {
    REQUIRED: 'Username is required',
    MIN_LENGTH: 'Username must be at least 1 character',
    MAX_LENGTH: 'Username cannot exceed 256 characters',
    INVALID_CHARS: 'Username can only contain letters, numbers, and hyphens',
    TOO_MANY_OPERATORS: 'Search query cannot contain more than 5 AND, OR, or NOT operators',
    INVALID_ENCODING: 'Search query contains characters that cannot be properly encoded',
  },
  ERROR: {
    API_ERROR: 'An error occurred while fetching data',
    NETWORK_ERROR: 'Network error occurred',
  },
} as const; 