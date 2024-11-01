import { useEffect } from 'react';

import { lsPrefixRiders } from '../constants/localstorage';

/**
 * Установка данных в Локальное хранилище для страницы Райдеры.
 */
export const useLocalStorageSetRiders = ({
  docsOnPage,
  activeSorting,
  category,
  isMounting,
  male,
}) => {
  useEffect(() => {
    if (isMounting.current) {
      return;
    }
    localStorage.setItem(`${lsPrefixRiders}columnName`, String(activeSorting.columnName));
    localStorage.setItem(`${lsPrefixRiders}isRasing`, String(activeSorting.isRasing));
    localStorage.setItem(`${lsPrefixRiders}category`, category);
    localStorage.setItem(`${lsPrefixRiders}male`, String(male));
    localStorage.setItem('recordsOnPageRiders', docsOnPage);
  }, [docsOnPage, activeSorting, category, male]);
};
