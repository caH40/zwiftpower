import React from 'react';

import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconSteeringDisabled({ squareSize = 24 }) {
  return (
    <MyTooltip tooltip={'Отключено рулевое управление'}>
      <div className={styles.box__rules} style={{ width: squareSize, height: squareSize }}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_906_2)">
            <path
              d="M20.4004 16.4235C19.3121 16.1528 18.4999 15.1718 18.4999 13.9999C18.4999 12.619 19.6192 12 21 12C21.1593 12 21.3256 12.0207 21.4771 12.0501C21.4841 12.2002 21.4999 12.348 21.4999 12.4999C21.4999 14.0971 21.0997 15.101 20.4004 16.4235ZM6.43781 19.685C7.332 18.4072 9.48787 17.4998 12 17.4998C14.5117 17.4998 16.6622 18.4118 17.5564 19.6896C15.9919 20.8233 14.0756 21.4999 12 21.4999C9.92194 21.4999 8.00358 20.8212 6.43781 19.685ZM2.50012 12C2.50012 11.8465 2.51583 11.6971 2.52291 11.5456C2.67436 11.5163 2.8403 11.4997 3 11.4997C4.38084 11.4997 5.50012 12.619 5.50012 13.9998C5.50012 15.1717 4.68661 16.1512 3.59873 16.4218C2.89988 15.0997 2.50012 13.5964 2.50012 12ZM12 2.4997C16.3721 2.4997 20.0019 5.47237 21.1035 9.51722H2.89655C3.99806 5.47242 7.62787 2.4997 12 2.4997ZM12 0C5.37267 0 0 5.3723 0 12C0 18.6273 5.37267 24 12 24C18.6273 24 24 18.6273 24 12C24 5.3723 18.6273 0 12 0Z"
              fill="#DC4119"
            />
            <path
              d="M15.7241 13.2412C15.7241 14.1553 14.049 14.8964 11.9826 14.8964C9.91607 14.8964 8.24104 14.1553 8.24104 13.2412C8.24104 12.3272 9.91607 11.5861 11.9826 11.5861C14.049 11.5861 15.7241 12.3272 15.7241 13.2412Z"
              fill="white"
            />
            <line
              x1="3.29289"
              y1="21.6777"
              x2="21.6777"
              y2="3.29288"
              stroke="black"
              strokeWidth="2"
            />
            <line
              x1="20.6777"
              y1="21.799"
              x2="2.99999"
              y2="2.70714"
              stroke="black"
              strokeWidth="2"
            />
          </g>
          <defs>
            <clipPath id="clip0_906_2">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconSteeringDisabled;