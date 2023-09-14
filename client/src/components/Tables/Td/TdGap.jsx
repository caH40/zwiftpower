import React from 'react';
import cn from 'classnames';

import { gapWithStr, secondesToTime } from '../../../utils/gaptoseconds';

import styles from './Td.module.css';

function TdGap(gap) {
  const gapTime = secondesToTime(gap.gap);
  const gapTimeStr = gapWithStr(gapTime);

  const gapHasMs = gapTimeStr?.includes('мс');

  return (
    <td>
      <div className={cn(styles.gap, { [styles.gap__ms]: gapHasMs })}>
        {gapTimeStr ? <>{gapTimeStr}</> : ''}
      </div>
    </td>
  );
}

export default TdGap;
