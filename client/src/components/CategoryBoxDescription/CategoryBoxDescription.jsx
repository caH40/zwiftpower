import React from 'react';

import CategoryBox from '../CategoryBox/CategoryBox';
import JerseyBox from '../JerseyBox/JerseyBox';
import GapBox from '../GapBox/GapBox';

import styles from './CategoryBoxDescription.module.css';

function CategoryBoxDescription({ subgroup, gaps }) {
  const groupLabel = subgroup.subgroupLabel;

  return (
    <div className={styles.wrapper}>
      <div className={styles.box__title}>
        <h3 className={styles.title}>Группа</h3>
        <CategoryBox label={groupLabel} showLabel={true} circle={true} />
      </div>
      <dl className={styles.list}>
        <div className={styles.box__term}>
          <dt className={styles.term}>ЗАРЕГИСТРИРОВАНО:</dt>
          <dd className={styles.description}>{subgroup.totalSignedUpCount}</dd>
        </div>
        <div className={styles.box__term}>
          <dt className={styles.term}>ДЖЕРСИ:</dt>
          <dd className={styles.description}>
            <JerseyBox jerseyId={subgroup.jerseyHash} />
          </dd>
        </div>
        <div className={styles.box__term}>
          <dt className={styles.term}>СТАРТ:</dt>
          <dd className={styles.description}>
            <GapBox groupLabel={groupLabel} gaps={gaps} />
          </dd>
        </div>
      </dl>
    </div>
  );
}

export default CategoryBoxDescription;
