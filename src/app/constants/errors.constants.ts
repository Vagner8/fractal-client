import { AppError } from '@types';

export const CIndicatorDuplicationError: AppError = {
  name: 'Indicator duplication',
  message: 'The Indicator should be unique',
  get formError(): Record<string, string> {
    return { [this.name]: this.message };
  },
} as const;
