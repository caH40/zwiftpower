import cn from 'classnames';

import { addClasses as cns } from '../../utils/additional-classes';

import styles from './icon.module.css';

function IconDiagram({ isActive, addCls = ' ' }) {
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
        <path
          className={activeColorFill}
          d="M21.3 20.4968H14.3285V3.51666C14.3285 3.23135 14.5409 3 14.8029 3H20.8256C21.0876 3 21.3 3.2313 21.3 3.51666V20.4968H21.3Z"
          fill="#CECECE"
        />
        <path
          className={activeColorFill}
          d="M21.3 3.51667V20.4967H20.1666V3.51667C20.1666 3.23131 19.9542 3.00006 19.6922 3.00006H20.8256C21.0877 3.00006 21.3 3.23131 21.3 3.51667Z"
          fill="#CECECE"
        />
        <path
          className={activeColorFill}
          d="M12.673 20.4968H7.12476V6.61648C7.12476 6.33117 7.33715 6.09982 7.59918 6.09982H12.1986C12.4606 6.09982 12.6731 6.33112 12.6731 6.61648V20.4968H12.673Z"
          fill="#CECECE"
        />
        <path
          className={activeColorFill}
          d="M12.6731 6.61628V20.4967H11.5397V6.61628C11.5397 6.33092 11.3273 6.09967 11.0653 6.09967H12.1987C12.4608 6.09967 12.6731 6.33092 12.6731 6.61628Z"
          fill="#CECECE"
        />
        <path
          className={activeColorFill}
          d="M5.46922 20.4968H1.34418V12.8162C1.34418 12.5308 1.55657 12.2995 1.8186 12.2995H4.99485C5.25683 12.2995 5.46927 12.5308 5.46927 12.8162L5.46922 20.4968Z"
          fill="#CECECE"
        />
        <path
          className={activeColorFill}
          d="M5.46938 12.8161V20.4967H4.33595V12.8161C4.33595 12.5307 4.1236 12.2995 3.86157 12.2995H4.99501C5.25704 12.2995 5.46938 12.5307 5.46938 12.8161Z"
          fill="#CECECE"
        />
        <path
          className={activeColorFill}
          d="M23.6484 20.8484H0.351562C0.157406 20.8484 0 20.691 0 20.4968C0 20.3026 0.157406 20.1453 0.351562 20.1453H23.6484C23.8426 20.1453 24 20.3026 24 20.4968C24 20.691 23.8426 20.8484 23.6484 20.8484Z"
          fill="#CECECE"
        />
      </svg>
    </div>
  );
}

export default IconDiagram;
