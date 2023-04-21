import React from 'react';

import styles from './icon.module.css';

function IconSchedule({ isActive }) {
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
        <line className={activeColorStroke} x1="1" y1="5.5" x2="23" y2="5.5" stroke="#CECECE" />
        <line className={activeColorStroke} x1="1" y1="7.5" x2="23" y2="7.5" stroke="#CECECE" />
        <rect className={activeColorFill} x="3" y="2" width="2" height="2" fill="#A8A8A8" />
        <rect className={activeColorFill} x="19" y="2" width="2" height="2" fill="#A8A8A8" />
        <rect className={activeColorFill} x="15" y="2" width="2" height="2" fill="#A8A8A8" />
        <rect className={activeColorFill} x="7" y="2" width="2" height="2" fill="#A8A8A8" />
        <rect className={activeColorFill} x="11" y="2" width="2" height="2" fill="#A8A8A8" />
        <path
          className={activeColorFill}
          d="M12.4219 18.6816V20H6.58594V18.875L9.3457 15.916C9.62305 15.6074 9.8418 15.3359 10.002 15.1016C10.1621 14.8633 10.2773 14.6504 10.3477 14.4629C10.4219 14.2715 10.459 14.0898 10.459 13.918C10.459 13.6602 10.416 13.4395 10.3301 13.2559C10.2441 13.0684 10.1172 12.9238 9.94922 12.8223C9.78516 12.7207 9.58203 12.6699 9.33984 12.6699C9.08203 12.6699 8.85938 12.7324 8.67188 12.8574C8.48828 12.9824 8.34766 13.1562 8.25 13.3789C8.15625 13.6016 8.10938 13.8535 8.10938 14.1348H6.41602C6.41602 13.627 6.53711 13.1621 6.7793 12.7402C7.02148 12.3145 7.36328 11.9766 7.80469 11.7266C8.24609 11.4727 8.76953 11.3457 9.375 11.3457C9.97266 11.3457 10.4766 11.4434 10.8867 11.6387C11.3008 11.8301 11.6133 12.1074 11.8242 12.4707C12.0391 12.8301 12.1465 13.2598 12.1465 13.7598C12.1465 14.041 12.1016 14.3164 12.0117 14.5859C11.9219 14.8516 11.793 15.1172 11.625 15.3828C11.4609 15.6445 11.2617 15.9102 11.0273 16.1797C10.793 16.4492 10.5332 16.7285 10.248 17.0176L8.76562 18.6816H12.4219ZM17.5898 11.4512V20H15.9023V13.3965L13.875 14.041V12.7109L17.4082 11.4512H17.5898Z"
          fill="#CECECE"
        />
      </svg>
    </div>
  );
}

export default IconSchedule;
