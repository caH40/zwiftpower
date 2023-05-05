import React from 'react';

import styles from './Td.module.css';

function HighlightValueMax({ value, dimensionValue }) {
  if (+value === 0 || value === '0max') return null;
  return (
    <>
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
    </>
  );
}

export default HighlightValueMax;
