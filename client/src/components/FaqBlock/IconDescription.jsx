import React from 'react';

import styles from './FaqBlock.module.css';

const IconDescription = ({ Icon, children, squareSize = 30 }) => {
  return (
    <div className={styles.box__iconsDescription}>
      <div className={styles.icon}>
        <Icon squareSize={squareSize} />
      </div>
      <p className={styles.text}>{children}</p>
    </div>
  );
};

export default IconDescription;
