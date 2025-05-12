import React, { useEffect, useRef } from 'react';
import { Box, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SearchFormProps, SearchFormData } from '../types/search';
import { searchSchema } from '../utils/validationSchemas';
import { MESSAGES } from '../constants/messages';

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading, error }) => {
  const { register, watch, formState: { errors } } = useForm<SearchFormData>({
    resolver: yupResolver(searchSchema)
  });

  const username = watch('username');
  const lastSearchedValue = useRef<string>('');

  useEffect(() => {
    if (!username || username === lastSearchedValue.current) return;
    if (username.length > 256) return;

    const timer = setTimeout(() => {
      onSearch(username);
      lastSearchedValue.current = username;
    }, 2000);

    return () => clearTimeout(timer);
  }, [username, onSearch]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter' && username && username.length <= 256) {
      event.preventDefault();
      onSearch(username);
      lastSearchedValue.current = username;
    }
  };

  const isError = Boolean(errors.username) || Boolean(error) || (username?.length ?? 0) > 256;
  const errorMessage = errors.username?.message ?? error?.message ?? ((username?.length ?? 0) > 256 ? MESSAGES.VALIDATION.MAX_LENGTH : '');

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 600,
        mx: 'auto',
        p: 2,
      }}
    >
      <TextField
        {...register('username')}
        label="Search GitHub Users"
        variant="outlined"
        fullWidth
        error={isError}
        helperText={errorMessage}
        disabled={isLoading}
        onKeyPress={handleKeyPress}
        slotProps={{
          input: {
            sx: { borderRadius: 2, backgroundColor: 'white' },
          },
        }}
      />
    </Box>
  );
}; 