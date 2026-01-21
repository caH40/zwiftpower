import { ZodError } from 'zod';

export function handleSafeParseErrors<T>(error: ZodError<T>): string {
  const { _errors, ...properties } = error.format();
  if (_errors.length) {
    return _errors.join(', ');
  }
  return JSON.stringify(properties);
}
