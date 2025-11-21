import React from 'react';

import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconAttention({ squareSize = 24, tooltip = 'Внимание!' }) {
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
          <g clipPath="url(#clip0_1470_30)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 16.875L7.125 24H16.875L24 16.875V7.125L16.875 0H7.125L0 7.125V16.875ZM10.5 4.5V13.5H13.5V4.5H10.5ZM10.5 16.5V19.5H13.5V16.5H10.5Z"
              fill="#CB0000"
            />
          </g>
          <defs>
            <clipPath id="clip0_1470_30">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconAttention;
