import React from 'react';
import cn from 'classnames';

import styles from './TableCategory.module.css';

function TableCategoryFemale() {
  return (
    <table className={styles.table}>
      <caption>Женщины</caption>
      <thead>
        <tr>
          <th></th>
          <th>zMAP</th>
          <th>zFTP</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span className={cn(styles.categoryBox, styles.A)}>{'Категория А'}</span>
          </td>
          <td>
            <span className={cn(styles.categoryBox, styles.A)}>{'≥4,8Вт/кг'}</span>
          </td>
          <td>
            <span className={cn(styles.categoryBox, styles.A)}>{'≥3,88Вт/кг'}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span className={cn(styles.categoryBox, styles.B)}>{'Категория B'}</span>
          </td>
          <td>
            <span className={cn(styles.categoryBox, styles.B)}>{'≥4,1Вт/кг'}</span>
          </td>
          <td>
            <span className={cn(styles.categoryBox, styles.B)}>{'≥3,36Вт/кг'}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span className={cn(styles.categoryBox, styles.C)}>{'Категория C'}</span>
          </td>
          <td>
            <span className={cn(styles.categoryBox, styles.C)}>{'≥3,2Вт/кг'}</span>
          </td>
          <td>
            <span className={cn(styles.categoryBox, styles.C)}>{'≥2,62Вт/кг'}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span className={cn(styles.categoryBox, styles.D)}>{'Категория D'}</span>
          </td>
          <td>
            <span className={cn(styles.categoryBox, styles.D)}>{'<3,2Вт/кг'}</span>
          </td>
          <td>
            <span className={cn(styles.categoryBox, styles.D)}>{'<2,62Вт/кг'}</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default TableCategoryFemale;
