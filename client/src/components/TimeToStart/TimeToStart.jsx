import React, { useCallback, useEffect, useState } from 'react';

import { getTimerLocal } from '../../utils/date-local';
import { secondesToTime } from '../../utils/date-convert';

import styles from './TimeToStart.module.css';

function TimeToStart({ time }) {
  const [timer, setTimer] = useState(null);

  const refreshClock = useCallback(() => {
    const timeStart = new Date(time).getTime();
    const timeNow = Date.now();
    const timeRemaining = timeStart - timeNow > 0 ? timeStart - timeNow : 0;
    setTimer(timeRemaining);
  }, [time]);

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, [refreshClock]);

  return (
    <>
      <span>
        <strong>{getTimerLocal(time, 'HM')}</strong>, до старта{' '}
      </span>
      <span className={styles.timer}>{secondesToTime(timer)}</span>
    </>
  );
}

export default TimeToStart;
