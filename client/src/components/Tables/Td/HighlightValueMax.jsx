import React from 'react';

import MyTooltip from '../../../HOC/MyTooltip';

import styles from './Td.module.css';

function HighlightValueMax({ value, dimensionValue, tooltip }) {
  if (+value === 0 || value === '0max') return null;
  return (
    <>
      <MyTooltip tooltip={tooltip}>
        {String(value).includes('max') ? (
          <span className={styles.max}>
            {value.replace('max', '')}
            <span className={styles.small}>{dimensionValue}</span>
          </span>
        ) : (
          <span>
            {value}
            <span className={styles.small}>{dimensionValue}</span>
          </span>
        )}
      </MyTooltip>
    </>
  );
}

export default HighlightValueMax;
