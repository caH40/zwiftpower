import cn from 'classnames/bind';

import styles from './Td.module.css';

const cx = cn.bind(styles);

/**
 * Значения у которых есть строка max подсвечивает красным, убирая слово max.
 */
function HighlightValueMax({ valueCPRounded, dimensionValue }) {
  if (!valueCPRounded || valueCPRounded === '0max') {
    return null;
  }

  const hasMax = String(valueCPRounded).includes('max');
  const value = hasMax ? valueCPRounded.replace('max', '') : valueCPRounded;

  return (
    <span className={cx({ max: hasMax })}>
      {value}
      <span className={styles.small}>{dimensionValue}</span>
    </span>
  );
}

export default HighlightValueMax;
