import React from 'react';

import styles from '../icon.module.css';

function IconParamsAscent({ squareSize = 24 }) {
  return (
    <div className={styles.box__rules} style={{ width: squareSize, height: squareSize }}>
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.1388 1.87402L7.12059 15.6528L4.78059 13.357C4.78059 13.357 -0.538234 24.7058 0.111178 24.7058H28.1735V24.7023L22.2829 12.1728L20.5482 13.2528L14.1388 1.87402ZM9.90177 13.2723L14.2271 4.88814L18.2594 12.0899L16.5194 13.2723L14.1547 10.9993L9.90177 13.2723Z"
          fill="black"
        />
      </svg>
    </div>
  );
}

export default IconParamsAscent;
