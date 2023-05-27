import React from 'react';

import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconShowResults({ squareSize = 24 }) {
  return (
    <MyTooltip tooltip={'На финише показывать таблицу результатов'}>
      <div className={styles.box__rules} style={{ width: squareSize, height: squareSize }}>
        <svg
          width="22"
          height="24"
          viewBox="0 0 22 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1"
            y="4.69238"
            width="20"
            height="18.3077"
            rx="1"
            stroke="#008600"
            strokeWidth="2"
          />
          <path
            d="M8 1H14C14.5523 1 15 1.44772 15 2V8.23077H7V2C7 1.44772 7.44771 1 8 1Z"
            fill="white"
            stroke="#008600"
            strokeWidth="2"
          />
          <ellipse cx="5" cy="12" rx="1" ry="0.923077" fill="#008600" />
          <path d="M8.99997 12H17" stroke="#008600" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="5" cy="15.6924" rx="1" ry="0.923077" fill="#008600" />
          <path
            d="M8.99997 15.6924H17"
            stroke="#008600"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <ellipse cx="5" cy="19.3847" rx="1" ry="0.923077" fill="#008600" />
          <path
            d="M8.99997 19.3848H17"
            stroke="#008600"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconShowResults;
