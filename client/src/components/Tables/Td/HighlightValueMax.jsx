// для максимальных значений задается красный цвет текста,
// кроме интервалов для определения категорий.
// добавляется размерность всем значениям
import React from 'react';
import cn from 'classnames';

import MyTooltip from '../../../HOC/MyTooltip';

import { zFTPInterval, zMAPInterval } from '../../../asset/rule-category';

import styles from './Td.module.css';

function HighlightValueMax({ valueCPRounded, dimensionValue, valueRaw, interval }) {
  if (+valueCPRounded === 0 || valueCPRounded === '0max') return null;
  const isException = interval === zFTPInterval || interval === zMAPInterval;

  return (
    <>
      <MyTooltip tooltip={valueRaw}>
        {String(valueCPRounded).includes('max') ? (
          <span className={cn(styles.max, { [styles.colorWhite]: isException })}>
            {isException ? valueRaw : valueCPRounded.replace('max', '')}
            <span className={styles.small}>{dimensionValue}</span>
          </span>
        ) : (
          <span>
            {isException ? valueRaw : valueCPRounded}
            <span className={styles.small}>{dimensionValue}</span>
          </span>
        )}
      </MyTooltip>
    </>
  );
}

export default HighlightValueMax;
