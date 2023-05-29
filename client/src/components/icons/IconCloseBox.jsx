import React from 'react';

import styles from './icon.module.css';

function IconCloseBox({ squareSize = 24 }) {
  return (
    <div className={styles.box} style={{ width: squareSize, height: squareSize }}>
      <svg
        width="27"
        height="26"
        viewBox="0 0 27 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="1" y="1" width="25" height="24" stroke="white" strokeWidth="2" />
        <line
          y1="-1.5"
          x2="12.9126"
          y2="-1.5"
          transform="matrix(0.733277 0.67993 -0.707107 0.707107 4.00006 11.1305)"
          stroke="white"
          strokeWidth="3"
        />
        <line
          y1="-1.5"
          x2="12.9126"
          y2="-1.5"
          transform="matrix(0.707107 -0.707107 0.733277 0.67993 13.4685 19.91)"
          stroke="white"
          strokeWidth="3"
        />
      </svg>
    </div>
  );
}

export default IconCloseBox;
