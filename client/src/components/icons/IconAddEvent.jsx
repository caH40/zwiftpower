import React from 'react';

import styles from './icon.module.css';

function IconAddEvent({ isActive }) {
  const activeColorStroke = isActive ? styles.active__stroke : undefined;
  const activeColorFill = isActive ? styles.active__fill : undefined;
  return (
    <div className={styles.box}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          className={activeColorStroke}
          x="0.5"
          y="0.5"
          width="23"
          height="23"
          stroke="#CECECE"
        />
        <line
          className={activeColorStroke}
          x1="4"
          y1="12.5"
          x2="20"
          y2="12.5"
          stroke="#CECECE"
        />
        <line
          className={activeColorStroke}
          x1="11.5"
          y1="4"
          x2="11.5"
          y2="20"
          stroke="#CECECE"
        />
        <line
          className={activeColorStroke}
          x1="4"
          y1="11.5"
          x2="20"
          y2="11.5"
          stroke="#CECECE"
        />
        <line
          className={activeColorStroke}
          x1="12.5"
          y1="4"
          x2="12.5"
          y2="20"
          stroke="#CECECE"
        />
        <path
          className={activeColorFill}
          d="M21.3242 7.08594V8H18.2969V7.08594H21.3242ZM18.6797 2.3125V8H17.5078V2.3125H18.6797ZM20.9297 4.62891V5.51953H18.2969V4.62891H20.9297ZM21.3203 2.3125V3.23047H18.2969V2.3125H21.3203Z"
          fill="#CECECE"
        />
      </svg>
    </div>
  );
}

export default IconAddEvent;
