import * as yup from 'yup';
import { MESSAGES } from '../constants/messages';

const GITHUB_USERNAME_REGEX = /^(?!-)(?!.*--)[a-z0-9-]{1,39}(?<!-)$/;

export const searchSchema = yup.object().shape({
  username: yup
    .string()
    .required(MESSAGES.VALIDATION.REQUIRED)
    .matches(
      GITHUB_USERNAME_REGEX,
      MESSAGES.VALIDATION.INVALID_USERNAME
    ),
}); 