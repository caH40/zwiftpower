import React from 'react';
import cn from 'classnames';

import { addClasses as cns } from '../../utils/additional-classes';
import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconDownload({ isActive, getClick, tooltip, addCls = ' ' }) {
  return (
    <MyTooltip tooltip={tooltip}>
      <div
        className={cn(styles.box, styles.box__alone, cns(styles, addCls))}
        onClick={getClick}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.42857 9.5C7.42857 6.73857 9.47527 4.5 12 4.5C14.5247 4.5 16.5714 6.73857 16.5714 9.5V10.75H17.7143C19.9234 10.75 21.7143 12.7088 21.7143 15.125C21.7143 17.5412 19.9234 19.5 17.7143 19.5H17.6C16.9688 19.5 16.4571 20.0596 16.4571 20.75C16.4571 21.4404 16.9688 22 17.6 22H17.7143C21.1858 22 24 18.922 24 15.125C24 11.7241 21.7423 8.89996 18.7767 8.3478C18.2699 4.75266 15.4289 2 12 2C8.57113 2 5.73007 4.75266 5.22327 8.3478C2.25773 8.89996 0 11.7241 0 15.125C0 18.922 2.81421 22 6.28571 22H6.4C7.03118 22 7.54286 21.4404 7.54286 20.75C7.54286 20.0596 7.03118 19.5 6.4 19.5H6.28571C4.07657 19.5 2.28571 17.5412 2.28571 15.125C2.28571 12.7088 4.07657 10.75 6.28571 10.75H7.42857V9.5ZM13.1429 10.75C13.1429 10.0596 12.6312 9.5 12 9.5C11.3688 9.5 10.8571 10.0596 10.8571 10.75V17.7323L9.37956 16.1161C8.93324 15.628 8.20962 15.628 7.7633 16.1161C7.31699 16.6043 7.31699 17.3957 7.7633 17.8839L11.1919 21.6339C11.6382 22.122 12.3618 22.122 12.8081 21.6339L16.2367 17.8839C16.683 17.3957 16.683 16.6043 16.2367 16.1161C15.7904 15.628 15.0667 15.628 14.6205 16.1161L13.1429 17.7323V10.75Z"
            fill="#4380D3"
          />
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconDownload;
