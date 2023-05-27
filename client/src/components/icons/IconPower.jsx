import React from 'react';

import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconPower({ squareSize = 24, tooltip }) {
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
          <path
            d="M16 11.5472H12.9656L15.1725 4H9.10358L8 14.9434H10.4826L9.37935 24L16 11.5472Z"
            fill="#680000"
          />
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconPower;
