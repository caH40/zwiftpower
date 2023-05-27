import React from 'react';

import MyTooltip from '../../../HOC/MyTooltip';

import styles from '../icon.module.css';

function IconParamsRoute({ squareSize = 24, tooltip }) {
  return (
    <MyTooltip tooltip={tooltip}>
      <div className={styles.box__rules} style={{ width: squareSize, height: squareSize }}>
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_400_27)">
            <path
              d="M6.3 9.6001C2.8377 9.6001 0 12.4291 0 15.8821C0 17.2201 0.4272 18.4636 1.1505 19.4857L5.5314 27.0589C6.1449 27.8605 6.5529 27.7084 7.0632 27.0169L11.895 18.7939C11.9925 18.6169 12.069 18.4291 12.1359 18.2371C12.4425 17.4898 12.6002 16.6898 12.6 15.8821C12.6 12.4291 9.7632 9.6001 6.3 9.6001ZM6.3 12.5437C8.1648 12.5437 9.648 14.023 9.648 15.8824C9.648 17.7418 8.1648 19.2205 6.3 19.2205C4.4355 19.2205 2.952 17.7415 2.952 15.8824C2.952 14.023 4.4355 12.5437 6.3 12.5437Z"
              fill="black"
            />
            <path
              d="M26.325 0C24.3054 0 22.65 1.6503 22.65 3.6648C22.65 4.4451 22.899 5.1705 23.3211 5.7666L25.8768 10.1844C26.2347 10.6518 26.4726 10.563 26.7702 10.1598L29.5887 5.3628C29.6457 5.2599 29.6904 5.1504 29.7291 5.0382C29.908 4.60242 30 4.13588 30 3.6648C30 1.65 28.3452 0 26.325 0ZM26.325 1.7172C27.4128 1.7172 28.278 2.58 28.278 3.6648C28.278 4.7493 27.4128 5.6118 26.325 5.6118C25.2375 5.6118 24.372 4.7493 24.372 3.6648C24.372 2.58 25.2375 1.7172 26.325 1.7172Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M26.4627 11.2236C25.7886 11.2386 25.1127 11.2671 24.4356 11.3172L24.54 12.9768C25.1904 12.9297 25.8419 12.8994 26.4939 12.8859L26.4627 11.2236ZM22.8702 11.4696C21.8292 11.5989 20.7792 11.7831 19.7412 12.0792L20.1321 13.6875C21.0753 13.4187 22.0527 13.245 23.0454 13.1217L22.8702 11.4696ZM18.1869 12.636C17.8759 12.7733 17.5748 12.932 17.2857 13.1109L17.2845 13.1124L17.2827 13.113C16.8702 13.3728 16.4355 13.7025 16.0806 14.1816C15.8235 14.5287 15.6132 14.9676 15.564 15.4866L17.0925 15.6561C17.1039 15.5343 17.1663 15.3735 17.2785 15.2223H17.2791V15.2217C17.46 14.9769 17.7312 14.7546 18.0537 14.5512L18.0549 14.5506C18.2848 14.4088 18.5241 14.2829 18.7713 14.1738L18.1869 12.636ZM17.4 16.3965L16.4091 17.667C16.644 17.8818 16.8903 18.0468 17.1282 18.1848L17.1312 18.1863L17.1342 18.1881C17.9238 18.6372 18.738 18.8907 19.4928 19.1313L19.9266 17.5359C19.1721 17.2953 18.4608 17.0631 17.8512 16.7169C17.6766 16.6155 17.5236 16.5096 17.4 16.3965ZM21.4005 17.9847L20.9769 19.5828L21.1773 19.6452L21.4233 19.7238C22.2375 19.9887 23.0175 20.2716 23.7147 20.6631L24.4221 19.1871C23.5791 18.7134 22.704 18.4038 21.8607 18.1296L21.8583 18.129L21.6057 18.0483L21.4005 17.9847ZM25.8606 20.2947L24.7737 21.4707C25.0305 21.7488 25.2228 22.0833 25.3164 22.4289L25.317 22.4307L25.3176 22.4334C25.4292 22.8369 25.4295 23.3115 25.3422 23.7909L26.8494 24.1125C26.9724 23.4357 26.9922 22.6926 26.79 21.9591C26.6139 21.3105 26.2779 20.7471 25.8606 20.2947ZM24.816 24.7929C24.6499 24.9684 24.4663 25.1264 24.2682 25.2645H24.2676C23.7276 25.6443 23.1012 25.9305 22.4358 26.1765L22.932 27.7497C23.6598 27.4806 24.4071 27.1506 25.1055 26.6592L25.1073 26.6577L25.1082 26.6571C25.395 26.4563 25.6603 26.2264 25.8999 25.971L24.816 24.7929ZM21.024 26.6196C20.0601 26.8788 19.0749 27.0762 18.0777 27.2436L18.3129 28.8873C19.3392 28.7148 20.3697 28.5087 21.3939 28.2333L21.024 26.6196ZM16.5774 27.4704C15.5736 27.6075 14.5644 27.7194 13.5522 27.8148L13.6848 29.4714C14.7126 29.3748 15.7422 29.2611 16.7703 29.1204L16.5774 27.4704ZM12.0309 27.9453C11.0166 28.0257 9.99989 28.0911 8.98229 28.1463L9.05909 29.8071C10.0866 29.7516 11.115 29.6853 12.1431 29.6037L12.0309 27.9453ZM7.45319 28.2213C6.84329 28.2498 6.23189 28.2732 5.61899 28.2948L5.66939 29.9571C6.28612 29.9359 6.90273 29.9113 7.51919 29.8833L7.45319 28.2213Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_400_27">
              <rect width="30" height="30" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconParamsRoute;
