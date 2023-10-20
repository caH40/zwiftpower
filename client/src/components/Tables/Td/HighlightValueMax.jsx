// для максимальных значений задается красный цвет текста,
// кроме интервалов для определения категорий.
// добавляется размерность всем значениям
import cn from 'classnames';

import { zFTPInterval, zMAPInterval } from '../../../assets/rule-category';

import styles from './Td.module.css';

function HighlightValueMax({ valueCPRounded, dimensionValue, valueRaw, interval }) {
  if (+valueCPRounded === 0 || valueCPRounded === '0max') {
    return null;
  }
  // исключения для интервалов на которых определяется категория
  const isException = interval === zFTPInterval || interval === zMAPInterval;

  return (
    <>
      {String(valueCPRounded).includes('max') ? (
        <span
          className={cn(styles.max, {
            [styles.colorWhite]: isException && dimensionValue !== 'вт',
          })}
        >
          {isException ? valueRaw : valueCPRounded.replace('max', '')}
          <span className={styles.small}>{dimensionValue}</span>
        </span>
      ) : (
        <span>
          {isException ? valueRaw : valueCPRounded}
          <span className={styles.small}>{dimensionValue}</span>
        </span>
      )}
    </>
  );
}

export default HighlightValueMax;
