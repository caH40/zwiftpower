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
            <span className={cn(styles.categoryBox, styles.categoryA)}>{'Категория А'}</span>
          </td>
          <td>
            <span className={cn(styles.categoryBox, styles.categoryA)}>{'≥4,8Вт/кг'}</span>
          </td>
          <td>
            <span className={cn(styles.categoryBox, styles.categoryA)}>{'≥3,88Вт/кг'}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span className={cn(styles.categoryBox, styles.categoryB)}>{'Категория B'}</span>
          </td>
          <td>
            <span className={cn(styles.categoryBox, styles.categoryB)}>{'≥4,1Вт/кг'}</span>
          </td>
          <td>
            <span className={cn(styles.categoryBox, styles.categoryB)}>{'≥3,36Вт/кг'}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span className={cn(styles.categoryBox, styles.categoryC)}>{'Категория C'}</span>
          </td>
          <td>
            <span className={cn(styles.categoryBox, styles.categoryC)}>{'≥3,2Вт/кг'}</span>
          </td>
          <td>
            <span className={cn(styles.categoryBox, styles.categoryC)}>{'≥2,62Вт/кг'}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span className={cn(styles.categoryBox, styles.categoryD)}>{'Категория D'}</span>
          </td>
          <td>
            <span className={cn(styles.categoryBox, styles.categoryD)}>{'<3,2Вт/кг'}</span>
          </td>
          <td>
            <span className={cn(styles.categoryBox, styles.categoryD)}>{'<2,62Вт/кг'}</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default TableCategoryFemale;
