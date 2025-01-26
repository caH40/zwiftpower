import React from 'react';

import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconTelegram({ tooltip, squareSize = 24, color = '#FF7C00' }) {
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
          <g clipPath="url(#clip0_796_12)">
            <path
              d="M20.4 0H3.6C1.61177 0 0 1.61177 0 3.6V20.4C0 22.3882 1.61177 24 3.6 24H20.4C22.3882 24 24 22.3882 24 20.4V3.6C24 1.61177 22.3882 0 20.4 0Z"
              fill={color}
            />
            <path
              d="M9.32812 18.9375C8.8125 18.9375 8.85938 18.75 8.71875 18.2812L7.21875 13.3594L18.7031 6.60938"
              fill="#C8DAEA"
            />
            <path
              d="M9.32812 18.9375C9.65625 18.9375 9.84375 18.75 10.0781 18.5625L12.1875 16.5469L9.5625 14.9531"
              fill="#A9C9DD"
            />
            <path
              d="M9.56252 14.9531L15.8906 19.5937C16.5469 20.0156 17.1094 19.7812 17.2969 18.9375L19.875 6.84371C20.1094 5.81246 19.4531 5.34371 18.75 5.67184L3.70315 11.4843C2.71877 11.8593 2.71877 12.4687 3.51565 12.7031L7.40627 13.9218L16.3125 8.24996C16.7344 8.01559 17.1094 8.10934 16.8281 8.43746"
              fill="#F6FBFE"
            />
          </g>
          <defs>
            <clipPath id="clip0_796_12">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconTelegram;
