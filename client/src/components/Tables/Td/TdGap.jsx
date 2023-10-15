import React from 'react';
import cn from 'classnames';

import { gapWithStr, secondesToTime } from '../../../utils/gaptoseconds';

import styles from './Td.module.css';

function TdGap({ gap, dsq }) {
  const gapTime = secondesToTime(gap);
  const gapTimeStr = gapWithStr(gapTime);

  const gapHasMs = gapTimeStr ? gapTimeStr.includes('мс') : null;

  return (
    <td>
      {/* если имеется дисквалификация (dsq), то gap пустой */}
      {!dsq && (
        <div className={cn(styles.gap, { [styles.gap__ms]: gapHasMs })}>
          {gapTimeStr ? <>{gapTimeStr}</> : ''}
        </div>
      )}
    </td>
  );
}

export default TdGap;
