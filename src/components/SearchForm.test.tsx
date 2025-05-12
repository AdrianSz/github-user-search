import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { SearchForm } from './SearchForm';
import { MESSAGES } from '../constants/messages';

describe('SearchForm', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should handle input validation and debounced search', async () => {
    render(<SearchForm onSearch={mockOnSearch} isLoading={false} error={null} />);
    
    const input = screen.getByRole('textbox', { name: /search github users/i });

    const longString = 'a'.repeat(257);
    await act(async () => {
      fireEvent.change(input, { target: { value: longString } });
    });

    await waitFor(() => {
      expect(screen.getByText(MESSAGES.VALIDATION.MAX_LENGTH)).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.change(input, { target: { value: 'testuser' } });
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('testuser');
    });
  });

  it('should handle loading and error states', async () => {
    const { rerender } = render(<SearchForm onSearch={mockOnSearch} isLoading={false} error={null} />);
    
    const input = screen.getByRole('textbox', { name: /search github users/i });

    rerender(<SearchForm onSearch={mockOnSearch} isLoading={true} error={null} />);
    expect(input).toBeDisabled();


    const error = new Error('API Error');
    rerender(<SearchForm onSearch={mockOnSearch} isLoading={false} error={error} />);
    expect(screen.getByText('API Error')).toBeInTheDocument();

    rerender(<SearchForm onSearch={mockOnSearch} isLoading={false} error={null} />);
    expect(input).not.toBeDisabled();
  });
}); 