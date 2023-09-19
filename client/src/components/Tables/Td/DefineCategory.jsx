import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { getCategoryZMAP, getCategoryZFTP } from '../../../utils/category';
import { zFTPInterval, zMAPInterval } from '../../../assets/rule-category';

import styles from './Td.module.css';

function DefineCategory({ children, cpBestEfforts, interval }) {
  const { column } = useSelector((state) => state.filterWatts.value);
  if (column === 'watts') return children; // для ватт возвращаем без преобразований

  const { watts, wattsKg } = cpBestEfforts.find((cp) => cp.duration === interval);

  if (!wattsKg.value) return null; // при отсутствии значения вт/кг ничего не рендерить
  return (
    <>
      {interval === zMAPInterval && (
        <div
          className={cn(styles.categoryBox, {
            [styles.categoryA]: getCategoryZMAP(wattsKg.value) === 'A',
            [styles.categoryB]: getCategoryZMAP(wattsKg.value) === 'B',
            [styles.categoryC]: getCategoryZMAP(wattsKg.value) === 'C',
            [styles.categoryD]: getCategoryZMAP(wattsKg.value) === 'D',
          })}
        >
          {children}
        </div>
      )}

      {interval === zFTPInterval && (
        <div
          className={cn(styles.categoryBox, {
            [styles.categoryA]: getCategoryZFTP(wattsKg.value, watts.value) === 'A',
            [styles.categoryB]: getCategoryZFTP(wattsKg.value, watts.value) === 'B',
            [styles.categoryC]: getCategoryZFTP(wattsKg.value, watts.value) === 'C',
            [styles.categoryD]: getCategoryZFTP(wattsKg.value, watts.value) === 'D',
          })}
        >
          {children}
        </div>
      )}

      {interval !== zMAPInterval && interval !== zFTPInterval && children}
    </>
  );
}

export default DefineCategory;
