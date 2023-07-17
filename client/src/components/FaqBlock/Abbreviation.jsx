import React from 'react';

import styles from './FaqBlock.module.css';

const Abbreviation = ({ Icon, children }) => {
  return (
    <div className={styles.box__iconsDescription}>
      <div className={styles.abbreviation}>{Icon}</div>
      <p className={styles.text}>{children}</p>
    </div>
  );
};

export default Abbreviation;
