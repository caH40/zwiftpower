import { ignoreList } from './ignore-list.js';

// игнорировать ошибки, перечисленные в списке ignoreList
export const ignoreError = (error: unknown): boolean => {
  if (error instanceof Error) {
    for (const messageIgnore of ignoreList) {
      if (error.message === messageIgnore) {
        return true;
      }
    }
  }

  return false;
};
