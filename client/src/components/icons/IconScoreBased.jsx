import React from 'react';

import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconScoreBased({
  squareSize = 24,
  tooltip = 'Строгая категоризация по Racing Score',
}) {
  return (
    <MyTooltip tooltip={tooltip}>
      <div className={styles.box__rules} style={{ width: squareSize, height: squareSize }}>
        <svg
          width="121"
          height="120"
          viewBox="0 0 121 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M30.7624 86.1602L48.1751 56.2978L71.7907 69.7979L84.9324 47.2602C86.7469 44.1484 85.6701 40.1694 82.5273 38.3728L58.9117 24.8727C55.7689 23.0761 51.7503 24.1423 49.9358 27.2541L19.3814 79.6541C17.5669 82.7659 18.6437 86.745 21.7865 88.5416C24.9293 90.3382 28.9479 89.272 30.7624 86.1602Z"
            fill="black"
          ></path>
          <path
            d="M102.5 67.8279L86.0201 58.407L74.1958 78.6853L55.1101 67.7748L53.7927 70.0342C51.9782 73.146 53.055 77.125 56.1978 78.9216L86.0729 96L85.1658 76.7364L102.5 67.8279Z"
            fill="black"
          ></path>
          <rect
            x="2.5"
            y="2"
            width="116"
            height="116"
            rx="58"
            stroke="black"
            strokeWidth="4"
          ></rect>
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconScoreBased;
