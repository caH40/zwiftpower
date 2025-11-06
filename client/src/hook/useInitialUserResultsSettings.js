import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setSortColumnTable } from '../redux/features/sortTableSlice';
import { lsPrefixUserResults } from '../constants/localstorage';

/**
 * Инициализация данных для страницы профиля пользователя с результатами из локального хранилища.
 */
export const useInitialUserResultsSettings = () => {
  const initialDocsOnPage = localStorage.getItem(`${lsPrefixUserResults}pageSize`) || '20';

  const [docsOnPage, setDocsOnPage] = useState(initialDocsOnPage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSortColumnTable({ columnName: 'Дата', isRasing: false }));
  }, [dispatch]);

  return { docsOnPage, setDocsOnPage };
};
