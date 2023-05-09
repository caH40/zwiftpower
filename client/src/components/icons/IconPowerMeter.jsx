import React from 'react';

import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconPowerMeter() {
  return (
    <MyTooltip toolTip={'Обязательное наличие измерителя мощности'}>
      <div className={styles.box__rules}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.1132 9.05662H13.4757L16.8485 0H7.57339L5.88678 13.1321H9.68098L7.99484 24L18.1132 9.05662Z"
            fill="#008600"
          />
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconPowerMeter;
