import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { initialSorting } from '../redux/features/sortTableSlice';
import { lsPrefixUserResults } from '../constants/localstorage';

/**
 * Инициализация данных для страницы профиля пользователя с результатами из локального хранилища.
 */
export const useInitialUserResultsSettings = () => {
  const initialDocsOnPage = localStorage.getItem(`${lsPrefixUserResults}pageSize`) || '20';

  const [docsOnPage, setDocsOnPage] = useState(initialDocsOnPage);
  const dispatch = useDispatch();

  const getInitialSettings = () => {
    const columnNameStored = localStorage.getItem(`${lsPrefixUserResults}columnName`);
    const isRasingStored = localStorage.getItem(`${lsPrefixUserResults}isRasing`);

    const columnName = columnNameStored
      ? isNaN(Number(columnNameStored))
        ? columnNameStored
        : Number(columnNameStored)
      : 1200;
    const isRasing = isRasingStored ? JSON.parse(isRasingStored) : false;

    return { columnName, isRasing };
  };

  useEffect(() => {
    const { columnName, isRasing } = getInitialSettings();

    dispatch(initialSorting({ columnName, isRasing }));
  }, [dispatch]);

  return { docsOnPage, setDocsOnPage };
};
