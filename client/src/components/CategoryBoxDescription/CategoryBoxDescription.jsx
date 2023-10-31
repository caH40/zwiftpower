import CategoryBox from '../CategoryBox/CategoryBox';
import JerseyBox from '../JerseyBox/JerseyBox';
import GapBox from '../GapBox/GapBox';

import styles from './CategoryBoxDescription.module.css';

function CategoryBoxDescription({ subgroup, gaps }) {
  const groupLabel = subgroup.subgroupLabel;

  return (
    <>
      <dl className={styles.list}>
        <div className={styles.box__term}>
          <dd className={styles.description}>
            <CategoryBox label={groupLabel} showLabel={true} circle={true} />
          </dd>
        </div>

        <div className={styles.box__term}>
          <dt className={styles.term}>РАЙДЕРЫ:</dt>
          <dd className={styles.description}>{subgroup.totalSignedUpCount}</dd>
        </div>

        <div className={styles.box__term}>
          <dt className={styles.term}>СТАРТ:</dt>
          <dd className={styles.description}>
            <GapBox
              groupLabel={groupLabel}
              gaps={gaps}
              groupStart={subgroup.eventSubgroupStart}
            />
          </dd>
        </div>

        <div className={styles.box__term}>
          <dt className={styles.term}>ДЖЕРСИ:</dt>
          <dd className={styles.description}>
            <JerseyBox jerseyId={subgroup.jerseyHash} />
          </dd>
        </div>
      </dl>
    </>
  );
}

export default CategoryBoxDescription;
