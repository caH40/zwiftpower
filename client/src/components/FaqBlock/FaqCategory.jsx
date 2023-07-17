import React from 'react';

import IconCategoryEnforced from '../icons/IconCategoryEnforced';
import TableCategory from '../Tables/TableCategory/TableCategory';

import styles from './FaqBlock.module.css';

function FaqCategory() {
  return (
    <div className={styles.block}>
      <h3 className={styles.title}>Отображение категорий на основе zFTP, zMAP</h3>
      <div className={styles.box}>
        <p className={styles.text}>
          Приблизительная оценка категории согласно информации, которая размещена на сайте
          Звифта:{' '}
          <a
            href="https://support.zwift.com/en_us/category-enforcement-faq-rJ5CQrpvc"
            className={styles.link}
            target="_blank"
            rel="noreferrer"
          >
            Category Enforcement FAQ
          </a>
        </p>
        <div className={styles.icon}>
          <IconCategoryEnforced squareSize={50} />
        </div>
      </div>
      <TableCategory />
      <div className={styles.box}>
        <p className={styles.text}>
          <strong>zMAP</strong> - Estimate of your Maximal Aerobic Power, i.e the power at which
          you achieve peak oxygen consumption in a short duration effort 4-6 min.
        </p>
      </div>
      <div className={styles.box}>
        <p className={styles.text}>
          <strong>zFTP</strong> - Estimate of your current Functional Threshold Power (FTP), the
          power you can sustain for a long period of time, i.e. {'>'} 40 min.
        </p>
      </div>
    </div>
  );
}

export default FaqCategory;
