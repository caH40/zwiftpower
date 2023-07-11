import React from 'react';

import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconResultsSmall({ squareSize = 24, tooltip }) {
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
          <rect x="2.5" y="2.5" width="19" height="19" stroke="#000000" />
          <line x1="2.83333" y1="6.5" x2="21.1667" y2="6.5" stroke="#000000" />
          <line x1="2.83333" y1="9" x2="21.1667" y2="9" stroke="#000000" />
          <line x1="7.83333" y1="11.5" x2="19.5" y2="11.5" stroke="#000000" />
          <line x1="4.5" y1="11.5" x2="5.33333" y2="11.5" stroke="#000000" />
          <line x1="7.83333" y1="14" x2="19.5" y2="14" stroke="#000000" />
          <line x1="4.5" y1="14" x2="5.33333" y2="14" stroke="#000000" />
          <line x1="7.83333" y1="16.5" x2="19.5" y2="16.5" stroke="#000000" />
          <line x1="4.5" y1="16.5" x2="5.33333" y2="16.5" stroke="#000000" />
          <line x1="7.83333" y1="19" x2="19.5" y2="19" stroke="#000000" />
          <line x1="4.5" y1="19" x2="5.33333" y2="19" stroke="#000000" />
          <rect x="4.5" y="3.66663" width="1.66667" height="1.66667" fill="#000000" />
          <rect x="17.8333" y="3.66663" width="1.66667" height="1.66667" fill="#000000" />
          <rect x="8.66667" y="3.66663" width="1.66667" height="1.66667" fill="#000000" />
          <rect x="13.6667" y="3.66663" width="1.66667" height="1.66667" fill="#000000" />
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconResultsSmall;
