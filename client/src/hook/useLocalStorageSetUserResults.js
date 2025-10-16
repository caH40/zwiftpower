import { useEffect } from 'react';

import { lsPrefixUserResults } from '../constants/localstorage';

/**
 * Установка данных в Локальное хранилище для страницы профиль результаты.
 */
export const useLocalStorageSetUserResults = ({ docsOnPage, activeSorting, isMounting }) => {
  useEffect(() => {
    if (isMounting.current) {
      isMounting.current = false;
      return;
    }

    localStorage.setItem(`${lsPrefixUserResults}columnName`, String(activeSorting.columnName));
    localStorage.setItem(`${lsPrefixUserResults}isRasing`, String(activeSorting.isRasing));
    localStorage.setItem(`${lsPrefixUserResults}pageSize`, docsOnPage);
  }, [docsOnPage, activeSorting, isMounting]);
};
