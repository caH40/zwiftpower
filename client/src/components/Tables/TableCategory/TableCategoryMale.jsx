import React from 'react';
import cn from 'classnames';

import styles from './TableCategory.module.css';

function TableCategoryMale() {
  return (
    <table className={styles.table}>
      <caption>Мужчины</caption>
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
            <span className={cn(styles.categoryBox, styles.A)}>{'≥5,1Вт/кг'}</span>
          </td>
          <td>
            <span className={cn(styles.categoryBox, styles.A)}>{'≥4,2Вт/кг и ≥250Вт'}</span>
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
            <span className={cn(styles.categoryBox, styles.B)}>{'≥3,36Вт/кг и ≥200Вт'}</span>
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
            <span className={cn(styles.categoryBox, styles.C)}>{'≥2,625Вт/кг и ≥150Вт'}</span>
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
            <span className={cn(styles.categoryBox, styles.D)}>{'<2,625Вт/кг и <150Вт'}</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default TableCategoryMale;
