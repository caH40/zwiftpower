import React from 'react';
import cn from 'classnames';

import useRatioBoxValue from '../../hook/useRatioBoxValue';
import MyTooltip from '../../HOC/MyTooltip';

import styles from './CPBox.module.css';

function CPBox({ value = 0, duration, date, label }) {
  const dateCP = date ? new Date(date).toLocaleDateString() : 'нет данных';
  const title = duration <= 60 ? `${duration} сек` : `${duration / 60} мин`;
  const ratio = useRatioBoxValue(duration, label);
  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>{title}</span>
      <MyTooltip tooltip={dateCP}>
        <div
          className={cn(styles.block, {
            [styles.watts__border]: label === 'watts',
            [styles.wattsPerKg__border]: label === 'wattsPerKg',
          })}
        >
          <div
            className={cn(styles.box, {
              [styles.watts__bg]: label === 'watts',
              [styles.wattsPerKg__bg]: label === 'wattsPerKg',
            })}
            style={{ width: 160 * value * ratio }}
          >
            <span className={styles.value}>{value}</span>
          </div>
        </div>
      </MyTooltip>
    </div>
  );
}

export default CPBox;
