import { searchSchema } from './validationSchemas';
import { ValidationError } from 'yup';

describe('searchSchema', () => {
  it('should validate correct GitHub username', async () => {
    const validUsernames = [
      'johndoe',
      'john-doe',
      'john123',
      'j123',
      'j',
      'a'.repeat(39),
    ];

    for (const username of validUsernames) {
      const result = await searchSchema.isValid({ username });
      expect(result).toBe(true);
    }
  });

  it('should reject invalid GitHub usernames', async () => {
    const invalidUsernames = [
      '',
      '-invalid',
      'invalid-',
      'in--valid',
      'Invalid',
      'invalid@name',
      'invalid name',
      'a'.repeat(40),
    ];

    for (const username of invalidUsernames) {
      const result = await searchSchema.isValid({ username });
      expect(result).toBe(false);
    }
  });

  it('should return correct error messages', async () => {
    try {
      await searchSchema.validate({ username: '' });
    } catch (error) {
      if (error instanceof ValidationError) {
        expect(error.message).toBe('Username is required');
      }
    }

    try {
      await searchSchema.validate({ username: 'Invalid@Name' });
    } catch (error) {
      if (error instanceof ValidationError) {
        expect(error.message).toBe('Invalid GitHub username. Allowed: lowercase letters, numbers, single hyphens (no "--", no "-" at start/end), max 39 characters');
      }
    }
  });
}); 