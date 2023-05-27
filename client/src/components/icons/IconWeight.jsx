import React from 'react';

import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconWeight({ squareSize = 24, tooltip }) {
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
            d="M22.9437 19.2519L19.4931 8.6547C19.3406 8.18618 18.9015 7.86879 18.4059 7.86879H14.7645C15.0597 7.38435 15.2328 6.81872 15.2328 6.21223C15.2328 4.44112 13.7825 3 11.9999 3C10.2174 3 8.76706 4.44108 8.76706 6.21223C8.76706 6.81868 8.94022 7.38432 9.23543 7.86879H5.59411C5.09853 7.86879 4.65943 8.18618 4.50687 8.6547L1.05633 19.2519C0.817529 19.9852 1.36785 20.7368 2.14357 20.7368H21.8564C22.6321 20.7369 23.1824 19.9853 22.9437 19.2519ZM10.2907 6.21223C10.2907 5.27567 11.0574 4.51391 12 4.51391C12.9426 4.51391 13.7092 5.27567 13.7092 6.21223C13.7092 7.02321 13.1335 7.70103 12.3674 7.86879H11.6326C10.8664 7.70106 10.2907 7.02321 10.2907 6.21223ZM10.4888 17.0487L9.50115 15.1643H9.03052V17.0487H7.88631V12.4034H9.03052V14.1967H9.50115L10.4691 12.4034H11.6984L10.4361 14.6253V14.6385L11.7703 17.0487H10.4888ZM16.5067 17.0487H15.552V16.9185C15.552 16.8212 15.5584 16.7239 15.5584 16.7239H15.5457C15.5457 16.7239 15.0942 17.1264 14.3163 17.1264C13.1195 17.1264 12.0211 16.2366 12.0211 14.7162C12.0211 13.3651 13.0476 12.3256 14.4734 12.3256C15.6697 12.3256 16.2714 12.9425 16.2714 12.9425L15.7219 13.7937C15.7219 13.7937 15.2449 13.3652 14.5842 13.3652C13.6035 13.3652 13.2047 13.9889 13.2047 14.6771C13.2047 15.5611 13.8191 16.0869 14.5453 16.0869C15.0942 16.0869 15.493 15.7494 15.493 15.7494V15.3918H14.8328V14.4237H16.5067V17.0487Z"
            fill="black"
          />
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconWeight;
