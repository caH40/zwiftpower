import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconZwift({ squareSize = 24, tooltip, color = '#0F4FA8' }) {
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
          <rect x="2" y="2" width="20" height="20" fill={color} />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.31942 16.0716L4.31953 16.0715L8.22411 9.36556H6.50471C5.1214 9.36556 4 8.16444 4 6.68278C4 5.20112 5.1214 4 6.50471 4H20L13.9462 14.6344H15.6209C17.0043 14.6344 18.1256 15.8356 18.1256 17.3172C18.1256 18.7989 17.0043 20 15.6209 20H6.50471C5.12893 20 4.01222 18.8119 4.0001 17.3414H4C4 17.3367 4.00001 17.332 4.00002 17.3273C4.00001 17.324 4 17.3206 4 17.3172H4.00005C4.00221 16.8196 4.07235 16.4807 4.31942 16.0716Z"
            fill="white"
          />
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconZwift;
