import React from 'react';

import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconHeartMonitor({ squareSize = 24 }) {
  return (
    <MyTooltip toolTip={'Обязательное наличие монитора пульса'}>
      <div className={styles.box__rules} style={{ width: squareSize, height: squareSize }}>
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24.9976 8.55411C25.0437 6.60605 24.4107 4.64122 23.0987 3.15446C20.5635 0.281846 16.4532 0.281846 13.918 3.15446L13 4.19472L12.082 3.15446C9.5468 0.281846 5.43651 0.281846 2.90136 3.15446C0.366213 6.02708 0.366213 10.6845 2.90136 13.5572L13 25L15.5247 22.1393"
            stroke="#008600"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.99994 14.0938H12.5555L15.2222 10.0649L17.8889 18.1226L20.5555 14.0938H24.9999"
            stroke="#008600"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconHeartMonitor;
