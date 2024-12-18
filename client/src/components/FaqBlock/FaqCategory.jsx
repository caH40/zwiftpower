import React from 'react';

import IconCategoryEnforced from '../icons/IconCategoryEnforced';
import TableCategoryMale from '../Tables/TableCategory/TableCategoryMale';
import TableCategoryFemale from '../Tables/TableCategory/TableCategoryFemale';

import styles from './FaqBlock.module.css';

function FaqCategory() {
  return (
    <div className={styles.block}>
      <h2 className={styles.title}>Отображение категорий на основе zFTP, zMAP</h2>
      <div className={styles.box}>
        <p className={styles.text}>
          Приблизительная оценка категории Category Enforcement по zFTP и zMAP.
        </p>
        <div className={styles.icon}>
          <IconCategoryEnforced squareSize={50} />
        </div>
      </div>
      <TableCategoryMale />
      <TableCategoryFemale />
      <div className={styles.box}>
        <p className={styles.text}>
          <strong>zMAP</strong> - Оценочная Максимальная Аэробная Мощность (Maximal Aerobic
          Power) <strong>для Звифта</strong>, то есть максимальная средняя мощность за 4-6 минут
        </p>
      </div>
      <div className={styles.box}>
        <p className={styles.text}>
          <strong>zFTP</strong> - Оценочная Функциональная Пороговая Мощность (Functional
          Threshold Power) <strong>для Звифта</strong>, то есть максимальная средняя мощность за
          заезд более 40 минут
        </p>
      </div>
    </div>
  );
}

export default FaqCategory;
