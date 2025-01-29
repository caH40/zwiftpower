import React from 'react';

import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconVk({ tooltip, squareSize = 24, color = '#FF7C00' }) {
  return (
    <MyTooltip tooltip={tooltip}>
      <div className={styles.box__rules} style={{ width: squareSize, height: squareSize }}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="2" y="2" width="20" height="20" fill={color} />
          <path
            d="M12.8039 20C6.65394 20 3.14617 13.994 3 4H6.08058C6.18177 11.3353 8.4528 14.4424 10.2517 15.0831V4H13.1524V10.3263C14.9288 10.054 16.7949 7.17117 17.4245 4H20.3253C19.8419 7.90792 17.8181 10.7908 16.379 11.9759C17.8181 12.9369 20.123 15.4514 21 20H17.8069C17.1211 16.9569 15.4123 14.6026 13.1524 14.2822V20H12.8039Z"
            fill="white"
          />
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconVk;
