import React from 'react';
import cn from 'classnames';

import styles from './TableCategory.module.css';

function TableCategory() {
  return (
    <table className={styles.table}>
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
            <span className={cn(styles.categoryBox, styles.categoryA)}>{'≥5,1Вт/кг'}</span>
          </td>
          <td>
            <span className={cn(styles.categoryBox, styles.categoryA)}>
              {'≥4,2Вт/кг и ≥250Вт'}
            </span>
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
            <span className={cn(styles.categoryBox, styles.categoryB)}>
              {'≥3,36Вт/кг и ≥200Вт'}
            </span>
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
            <span className={cn(styles.categoryBox, styles.categoryC)}>
              {'≥2,625Вт/кг и ≥150Вт'}
            </span>
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
            <span className={cn(styles.categoryBox, styles.categoryD)}>
              {'<2,625Вт/кг и <150Вт'}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default TableCategory;
