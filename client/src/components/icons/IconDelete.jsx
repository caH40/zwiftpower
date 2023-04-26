import React from 'react';

import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconDelete({ isActive, getClick, toolTip }) {
  return (
    <MyTooltip toolTip={toolTip}>
      <div className={`${styles.box} ${styles.box__alone}`} onClick={getClick}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className={styles.alone__error}
            cx="12"
            cy="12"
            r="10.5"
            stroke="#CB0000"
            strokeWidth="3"
          />
          <line
            className={styles.alone__error}
            x1="6.94975"
            y1="6.94975"
            x2="16.8492"
            y2="16.8492"
            stroke="#CB0000"
            strokeWidth="2"
          />
          <line
            className={styles.alone__error}
            x1="6.94975"
            y1="16.8493"
            x2="16.8492"
            y2="6.94976"
            stroke="#CB0000"
            strokeWidth="2"
          />
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconDelete;
