import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setSortColumnTable } from '../redux/features/sortTableSlice';
import { setFilterCategory } from '../redux/features/filterCategorySlice';
import { lsPrefixRiders } from '../constants/localstorage';
import { setFilterGender } from '../redux/features/filterGenderSlice';

/**
 * Инициализация данных для страницы Райдеры из локального хранилища.
 */
export const useInitialRidersSettings = () => {
  const dispatch = useDispatch();

  const getInitialSettings = () => {
    const columnNameStored = localStorage.getItem(`${lsPrefixRiders}columnName`);
    const isRasingStored = localStorage.getItem(`${lsPrefixRiders}isRasing`);
    const categoryStored = localStorage.getItem(`${lsPrefixRiders}category`);
    const maleStored = localStorage.getItem(`${lsPrefixRiders}male`);

    let genderName;
    switch (maleStored) {
      case 'true':
        genderName = 'М';
        break;

      case 'false':
        genderName = 'Ж';
        break;

      default:
        genderName = 'All';
        break;
    }

    const columnName = columnNameStored
      ? isNaN(Number(columnNameStored))
        ? columnNameStored
        : Number(columnNameStored)
      : 'Финиш';
    const isRasing = isRasingStored ? JSON.parse(isRasingStored) : false;
    const categoryForLs = categoryStored || 'All';

    return { columnName, isRasing, categoryForLs, genderName };
  };

  useEffect(() => {
    const { columnName, isRasing, categoryForLs, genderName } = getInitialSettings();

    dispatch(setSortColumnTable({ columnName, isRasing }));
    dispatch(setFilterCategory({ name: categoryForLs, isActive: true }));
    dispatch(setFilterGender({ name: genderName, isActive: true }));
  }, [dispatch]);
};
