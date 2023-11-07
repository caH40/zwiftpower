import { getTimerLocal } from '../../utils/date-local';
import { checkSeconds } from '../../utils/seconds';

import styles from './GapBox.module.css';

function GapBox({ groupLabel, gaps, groupStart }) {
  const minutes = gaps[groupLabel];

  const hasSeconds = checkSeconds(groupStart);
  const timeFormat = hasSeconds ? 'HmS' : 'HM';
  const groupStartTime = getTimerLocal(groupStart, timeFormat);

  const gapStr = hasSeconds
    ? `+${minutes.split(':')[0]}м${minutes.split(':')[1]}c`
    : `+${minutes} мин`;

  return <span className={styles.box}>{minutes === 0 ? groupStartTime : gapStr}</span>;
}

export default GapBox;
