import React from 'react';

import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconPulse({ squareSize = 24, toolTip }) {
  return (
    <MyTooltip toolTip={toolTip}>
      <div className={styles.box__rules} style={{ width: squareSize, height: squareSize }}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.9982 8.66558C21.0328 7.20454 20.558 5.73091 19.574 4.61585C17.6726 2.46138 14.5899 2.46138 12.6885 4.61585L12 5.39604L11.3115 4.61585C9.41011 2.46138 6.32739 2.46138 4.42602 4.61585C2.52466 6.77031 2.52466 10.2634 4.42602 12.4179L12 21L13.8935 18.8544"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 13.0001H11.6667L13.6667 10L15.6667 16L17.6667 13.0001H21"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconPulse;
