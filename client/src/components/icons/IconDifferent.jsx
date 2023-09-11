import React from 'react';

import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconDifferent({ squareSize = 24 }) {
  return (
    <MyTooltip tooltip={'Разное'}>
      <div className={styles.box__rules} style={{ width: squareSize, height: squareSize }}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 3L10.2857 4.7V18.3L12 20H22.2857L24 18.3V4.7L22.2857 3H12ZM22.2857 18.3H12V4.7H22.2857V18.3ZM6.85714 13.2V6.4H8.57143V4.7H6L5.14286 5.55V17.45L6 18.3H8.57143V16.6H6.85714V13.2ZM1.71429 11.5V8.1H3.42857V6.4H0.857143L0 7.25V15.75L0.857143 16.6H3.42857V14.9H1.71429V11.5Z"
            fill="black"
          />
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconDifferent;
