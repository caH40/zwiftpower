import React from 'react';

import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconOk({ squareSize = 24, tooltip }) {
  return (
    <MyTooltip tooltip={tooltip}>
      <div className={styles.box__rules} style={{ width: squareSize, height: squareSize }}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.8454 0L5.1134 12.9315L1.15464 7.67123L0 9.26027L5.1134 16L16 1.53425L14.8454 0Z"
            fill="#43A047"
          />
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconOk;
