import React, { useEffect, useRef } from 'react';
import { Box, TextField, FormHelperText, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SearchFormProps, SearchFormData } from '../types/search';
import { searchSchema } from '../utils/validationSchemas';
import { MESSAGES } from '../constants/messages';

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading, error }) => {
  const { register, watch, formState: { errors } } = useForm<SearchFormData>({
    resolver: yupResolver(searchSchema),
    mode: 'onChange'
  });

  const username = watch('username');
  const lastSearchedValue = useRef<string>('');

   // TECHNIKA PROGRAMOWANIA FUNKCYJNEGO:
  // Monada Option do obsługi wartości opcjonalnych
  
  // Najpierw definiujemy interfejs
  type MaybeType<T> = {
    map: <U>(fn: (val: T) => U) => MaybeType<U>;
    flatMap: <U>(fn: (val: T) => MaybeType<U>) => MaybeType<U>;
    getOrElse: (defaultValue: T) => T;
    isPresent: () => boolean;
  };
  
  // Następnie implementujemy funkcję fabrykującą
  const Maybe = <T,>(value: T | null | undefined): MaybeType<T> => ({
    map: <U,>(fn: (val: T) => U) => 
      value != null ? Maybe(fn(value)) : Maybe<U>(null),
    flatMap: <U,>(fn: (val: T) => MaybeType<U>) => 
      value != null ? fn(value) : Maybe<U>(null),
    getOrElse: (defaultValue: T) => 
      value != null ? value : defaultValue,
    isPresent: () => value != null,
  });

  useEffect(() => {
    if (!username || username === lastSearchedValue.current) return;
    if (errors.username) return;

    const timer = setTimeout(() => {
      onSearch(username);
      lastSearchedValue.current = username;
    }, 2000);

    return () => clearTimeout(timer);
  }, [username, onSearch, errors.username]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      
      if (username && !errors.username) {
        onSearch(username);
        lastSearchedValue.current = username;
      }
    }
  };

  const isError = Boolean(errors.username) || Boolean(error);
  const errorMessage = errors.username?.message ?? error?.message;

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
        disabled={isLoading && !errors.username}
        onKeyDown={handleKeyPress}
        slotProps={{
          input: {
            inputProps: {
              maxLength: 39,
            },
            sx: { borderRadius: 2, backgroundColor: 'white' },
          },
        }}
      />
      {!isError && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: -1 }}>
          {MESSAGES.VALIDATION.VALID_USERNAME}
        </Typography>
      )}
    </Box>
  );
};