import { useEffect } from 'react';

import { lsPrefixRiders } from '../constants/localstorage';

/**
 * Установка данных в Локальное хранилище для страницы Райдеры.
 */
export const useLocalStorageSetRiders = ({
  search,
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

    localStorage.setItem(`${lsPrefixRiders}filter`, String(search));
    localStorage.setItem(`${lsPrefixRiders}columnName`, String(activeSorting.columnName));
    localStorage.setItem(`${lsPrefixRiders}isRasing`, String(activeSorting.isRasing));
    localStorage.setItem(`${lsPrefixRiders}category`, category);
    localStorage.setItem(`${lsPrefixRiders}male`, String(male));
    localStorage.setItem(`${lsPrefixRiders}pageSize`, docsOnPage);
  }, [docsOnPage, activeSorting, category, male, search]);
};
