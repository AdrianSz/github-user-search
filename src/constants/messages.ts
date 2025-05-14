export const MESSAGES = {
  SEARCH: {
    PLACEHOLDER: 'Enter GitHub username',
    BUTTON: 'Search',
    BUTTON_LOADING: 'Searching...',
    NO_RESULTS: 'No users found. Try a different search term.',
  },
  VALIDATION: {
    REQUIRED: 'Username is required',
    VALID_USERNAME: 'Allowed: lowercase letters, numbers, single hyphens (no special characters are not allowed. Use A-Z and 0-9), max 39 characters',
    INVALID_USERNAME: 'Invalid GitHub username. Allowed: lowercase letters, numbers, single hyphens (no special characters are not allowed. Use A-Z and 0-9), max 39 characters',
  }
} as const; 