import React from 'react';

import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconPowerKg({ squareSize = 24, toolTip }) {
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
          <g clipPath="url(#clip0_465_160)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 11.5472H4.96556L7.17246 4H1.10358L0 14.9434H2.48263L1.37935 24L8 11.5472ZM21 7L5 23L4.29289 22.2929L20.2929 6.29289L21 7ZM22.2466 17.1881L23.9718 23.1628C24.0912 23.5763 23.8161 24 23.4282 24H13.5718C13.1839 24 12.9088 23.5763 13.0282 23.1628L14.7534 17.1881C14.8297 16.924 15.0493 16.745 15.2971 16.745H17.1177C16.9701 16.4719 16.8835 16.153 16.8835 15.8111C16.8835 14.8125 17.6087 14 18.5 14C19.3912 14 20.1164 14.8125 20.1164 15.8111C20.1164 16.153 20.0298 16.4719 19.8823 16.745H21.7029C21.9507 16.745 22.1703 16.924 22.2466 17.1881ZM18.5 14.8535C18.0287 14.8535 17.6454 15.283 17.6454 15.8111C17.6454 16.2683 17.9332 16.6505 18.3163 16.745H18.6837C19.0668 16.6504 19.3546 16.2683 19.3546 15.8111C19.3546 15.283 18.9713 14.8535 18.5 14.8535ZM17.2506 20.8582L17.7444 21.9206H18.3852L17.718 20.5618V20.5543L18.3492 19.3016H17.7346L17.2506 20.3127H17.0153V19.3016H16.4432V21.9206H17.0153V20.8582H17.2506ZM20.276 21.9206H20.7534V20.4407H19.9164V20.9865H20.2465V21.1881C20.2465 21.1881 20.0471 21.3784 19.7727 21.3784C19.4096 21.3784 19.1024 21.0819 19.1024 20.5835C19.1024 20.1955 19.3017 19.8439 19.7921 19.8439C20.1224 19.8439 20.361 20.0855 20.361 20.0855L20.6357 19.6056C20.6357 19.6056 20.3349 19.2578 19.7367 19.2578C19.0238 19.2578 18.5105 19.8438 18.5105 20.6056C18.5105 21.4628 19.0598 21.9645 19.6582 21.9645C20.0471 21.9645 20.2728 21.7375 20.2728 21.7375H20.2792C20.2792 21.7375 20.276 21.7924 20.276 21.8473V21.9206Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_465_160">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconPowerKg;