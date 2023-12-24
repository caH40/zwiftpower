import { ignoreList } from './ignore-list.js';

// игнорировать ошибки, перечисленные в списке ignoreList
export const ignoreError = (error: unknown): boolean => {
  if (error instanceof Error) {
    return ignoreList.includes(error.message);
  }

  return false;
};
