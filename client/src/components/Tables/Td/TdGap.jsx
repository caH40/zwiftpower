import React from 'react';

import { gapWithStr, secondesToTime } from '../../../utils/gaptoseconds';

import styles from './Td.module.css';

function TdGap(gap) {
  const gapTime = secondesToTime(gap.gap);
  const gapTimeStr = gapWithStr(gapTime);

  return (
    <td>
      <div className={styles.gap}>{gapTimeStr ? <>{gapTimeStr}</> : ''}</div>
    </td>
  );
}

export default TdGap;
