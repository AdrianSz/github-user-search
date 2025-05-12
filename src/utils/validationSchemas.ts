import * as yup from 'yup';
import { MESSAGES } from '../constants/messages';

export const searchSchema = yup.object({
  username: yup
    .string()
    .required(MESSAGES.VALIDATION.REQUIRED)
    .max(256, MESSAGES.VALIDATION.MAX_LENGTH)
    .matches(
      /^[a-zA-Z0-9\s\-_\.@]+$/,
      MESSAGES.VALIDATION.INVALID_CHARS
    )
    .test(
      'no-multiple-operators',
      MESSAGES.VALIDATION.TOO_MANY_OPERATORS,
      (value) => {
        if (!value) return true;
        const operators = (value.match(/\b(AND|OR|NOT)\b/gi) || []).length;
        return operators <= 5;
      }
    )
    .test(
      'valid-encoding',
      MESSAGES.VALIDATION.INVALID_ENCODING,
      (value) => {
        if (!value) return true;
        try {
          encodeURIComponent(value);
          return true;
        } catch {
          return false;
        }
      }
    )
}).required(); 