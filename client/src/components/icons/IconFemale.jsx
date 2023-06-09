import React from 'react';

import styles from './icon.module.css';

function IconFemale({ squareSize = 24 }) {
  return (
    <div className={styles.box__inline} style={{ width: squareSize, height: squareSize }}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="12" fill="#9422AE" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 12.3C14.2352 12.3 16 10.5281 16 8.4C16 6.27192 14.2352 4.5 12 4.5C9.76479 4.5 8 6.27192 8 8.4C8 10.5281 9.76479 12.3 12 12.3ZM17.5 8.4C17.5 11.1113 15.4648 13.3559 12.8125 13.7415V15.9H16V17.4H12.8125V21H11.3125V17.4H8V15.9H11.3125V13.7582C8.59941 13.4261 6.5 11.1537 6.5 8.4C6.5 5.41766 8.96243 3 12 3C15.0376 3 17.5 5.41766 17.5 8.4Z"
          fill="white"
        />
      </svg>
    </div>
  );
}

export default IconFemale;
