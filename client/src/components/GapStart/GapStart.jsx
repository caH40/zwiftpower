import { secondesToTime } from '../../utils/gaptoseconds';
import CategoryOnlyBox from '../CategoryOnlyBox/CategoryOnlyBox';

import styles from './GapStart.module.css';

/**
 * Блок отображения стартовых гэпов
 */
function GapStart({ gaps }) {
  const gapsSorted = [...gaps]
    .filter((gap) => gap.gap !== 0)
    .sort((a, b) => a.subgroupLabel.toLowerCase().localeCompare(b.subgroupLabel.toLowerCase()));
  return (
    <div className={styles.block}>
      {gapsSorted.map((gap) => (
        <div className={styles.box} key={gap.id}>
          {<CategoryOnlyBox label={gap.subgroupLabel} squareSize={17} />}
          <span className={styles.time}>+{secondesToTime(gap.gap)}</span>
        </div>
      ))}
    </div>
  );
}

export default GapStart;
