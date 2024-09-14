import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { initialSorting } from '../redux/features/sortTableSlice';
import { setFilterCategory } from '../redux/features/filterCategorySlice';
import { lsPrefixRiders } from '../constants/localstorage';

/**
 * Инициализация данных для страницы Райдеры из локального хранилища.
 */
export const useInitialRidersSettings = () => {
  const dispatch = useDispatch();

  const getInitialSettings = () => {
    const columnNameStored = localStorage.getItem(`${lsPrefixRiders}columnName`);
    const isRasingStored = localStorage.getItem(`${lsPrefixRiders}isRasing`);
    const categoryStored = localStorage.getItem(`${lsPrefixRiders}category`);

    const columnName = columnNameStored
      ? isNaN(Number(columnNameStored))
        ? columnNameStored
        : Number(columnNameStored)
      : 'Финиш';
    const isRasing = isRasingStored ? JSON.parse(isRasingStored) : false;
    const categoryForLs = categoryStored || 'All';

    return { columnName, isRasing, categoryForLs };
  };

  useEffect(() => {
    const { columnName, isRasing, categoryForLs } = getInitialSettings();
    dispatch(initialSorting({ columnName, isRasing }));
    dispatch(setFilterCategory({ name: categoryForLs, isActive: true }));
  }, [dispatch]);
};
