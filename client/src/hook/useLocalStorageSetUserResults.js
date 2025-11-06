import { useEffect } from 'react';

import { lsPrefixUserResults } from '../constants/localstorage';

/**
 * Установка данных в Локальное хранилище для страницы профиль результаты.
 */
export const useLocalStorageSetUserResults = ({ docsOnPage, isMounting }) => {
  useEffect(() => {
    if (isMounting.current) {
      isMounting.current = false;
      return;
    }

    localStorage.setItem(`${lsPrefixUserResults}pageSize`, docsOnPage);
  }, [docsOnPage, isMounting]);
};
