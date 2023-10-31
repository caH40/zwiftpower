// import { getMinutesString } from '../../utils/declination';
import { getTimerLocal } from '../../utils/date-local';

import styles from './GapBox.module.css';

function GapBox({ groupLabel, gaps, groupStart }) {
  const minutes = gaps[groupLabel];

  const groupStartTime = getTimerLocal(groupStart, 'HM');
  return (
    <span className={styles.box}>
      {minutes === 0 ? groupStartTime : `+${minutes} мин`}
      {/* убрал, для текущей вёрстки используется сокращенное слово "мин" */}
      {/* {minutes === 0 ? groupStartTime : `+${getMinutesString(minutes)}`} */}
    </span>
  );
}

export default GapBox;
