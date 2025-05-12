import { User } from './user';

export interface SearchFormProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
  error: Error | null;
}

export interface SearchFormData {
  username: string;
}

export interface SearchResult {
  users: User[];
  totalCount: number;
  hasMore: boolean;
} 