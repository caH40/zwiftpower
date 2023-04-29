import React from 'react';
import cn from 'classnames';

import { addClasses as cns } from '../../utils/additional-classes';

import styles from './icon.module.css';

function IconResults({ isActive, addCls = ' ' }) {
  const activeColorStroke = isActive ? styles.active__stroke : undefined;
  const activeColorFill = isActive ? styles.active__fill : undefined;
  return (
    <div className={cn(styles.box, cns(styles, addCls))}>
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
        <line className={activeColorStroke} x1="1" y1="5.5" x2="23" y2="5.5" stroke="#CECECE" />
        <line className={activeColorStroke} x1="1" y1="7.5" x2="23" y2="7.5" stroke="#CECECE" />
        <line
          className={activeColorStroke}
          x1="7"
          y1="10.5"
          x2="21"
          y2="10.5"
          stroke="#CECECE"
        />
        <line
          className={activeColorStroke}
          x1="3"
          y1="10.5"
          x2="4"
          y2="10.5"
          stroke="#CECECE"
        />
        <line
          className={activeColorStroke}
          x1="7"
          y1="12.5"
          x2="21"
          y2="12.5"
          stroke="#6996D3"
        />
        <line
          className={activeColorStroke}
          x1="3"
          y1="12.5"
          x2="4"
          y2="12.5"
          stroke="#6996D3"
        />
        <line
          className={activeColorStroke}
          x1="7"
          y1="14.5"
          x2="21"
          y2="14.5"
          stroke="#CECECE"
        />
        <line
          className={activeColorStroke}
          x1="3"
          y1="14.5"
          x2="4"
          y2="14.5"
          stroke="#CECECE"
        />
        <line
          className={activeColorStroke}
          x1="7"
          y1="16.5"
          x2="21"
          y2="16.5"
          stroke="#CECECE"
        />
        <line
          className={activeColorStroke}
          x1="3"
          y1="16.5"
          x2="4"
          y2="16.5"
          stroke="#CECECE"
        />
        <line
          className={activeColorStroke}
          x1="7"
          y1="18.5"
          x2="21"
          y2="18.5"
          stroke="#CECECE"
        />
        <line
          className={activeColorStroke}
          x1="3"
          y1="18.5"
          x2="4"
          y2="18.5"
          stroke="#CECECE"
        />
        <line
          className={activeColorStroke}
          x1="7"
          y1="20.5"
          x2="21"
          y2="20.5"
          stroke="#CECECE"
        />
        <line
          className={activeColorStroke}
          x1="3"
          y1="20.5"
          x2="4"
          y2="20.5"
          stroke="#CECECE"
        />
        <rect className={activeColorFill} x="3" y="2" width="2" height="2" fill="#CECECE" />
        <rect className={activeColorFill} x="19" y="2" width="2" height="2" fill="#CECECE" />
        <rect className={activeColorFill} x="15" y="2" width="2" height="2" fill="#CECECE" />
        <rect className={activeColorFill} x="7" y="2" width="2" height="2" fill="#6996D3" />
        <rect className={activeColorFill} x="11" y="2" width="2" height="2" fill="#CECECE" />
      </svg>
    </div>
  );
}

export default IconResults;
