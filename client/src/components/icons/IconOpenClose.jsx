import cn from 'classnames';

import styles from './icon.module.css';

function IconOpenClose({ isOpened }) {
  return (
    <div className={cn(styles.arrow, { [styles.opened]: isOpened })}>
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0.707107"
          y1="4.24263"
          x2="5.65685"
          y2="9.19238"
          stroke="black"
          strokeWidth="2"
        />
        <line
          x1="4.24263"
          y1="9.19237"
          x2="9.19238"
          y2="4.24262"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

export default IconOpenClose;
