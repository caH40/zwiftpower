import React from 'react';
import cn from 'classnames';

import { addClasses as cns } from '../../utils/additional-classes';
import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconEdit({ isActive, getClick, tooltip, addCls = ' ', bgColor, squareSize = 24 }) {
  return (
    <MyTooltip tooltip={tooltip}>
      <div
        className={cn(styles.box, cns(styles, addCls))}
        onClick={getClick}
        style={{ width: squareSize, height: squareSize }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          id="x"
        >
          <g clipPath="url(#clip0_345_2)">
            <path
              className={styles.alone__success}
              d="M10.5 0.75C10.3425 0.749918 10.189 0.799331 10.0613 0.891352C9.93349 0.983372 9.83792 1.11327 9.78808 1.26264L9.02637 3.54779C8.71883 3.65608 8.418 3.78022 8.12402 3.92133L5.96924 2.84467C5.82843 2.7743 5.66906 2.75006 5.51368 2.77529C5.35831 2.80052 5.21481 2.87402 5.10351 2.98533L2.98242 5.10638C2.8711 5.21768 2.79762 5.36122 2.77239 5.5166C2.74715 5.67197 2.77143 5.83133 2.8418 5.97214L3.91699 8.12252C3.77556 8.41797 3.6504 8.72016 3.54199 9.02928L1.25977 9.79097C1.1104 9.8408 0.980498 9.93638 0.888479 10.0642C0.79646 10.1919 0.746987 10.3454 0.74707 10.5028V13.5029C0.746987 13.6603 0.79646 13.8139 0.888479 13.9416C0.980498 14.0694 1.1104 14.165 1.25977 14.2148L3.54932 14.978C3.65723 15.2837 3.78114 15.5822 3.92139 15.8745L2.8418 18.0337C2.77144 18.1745 2.74716 18.3338 2.7724 18.4892C2.79763 18.6446 2.87111 18.788 2.98242 18.8993L5.10351 21.0219C5.21481 21.1332 5.35831 21.2067 5.51368 21.2319C5.66906 21.2571 5.82843 21.2329 5.96924 21.1625L8.12402 20.0844C8.4177 20.2247 8.71775 20.3486 9.0249 20.4564L9.78808 22.7445C9.83792 22.8939 9.93349 23.0238 10.0613 23.1158C10.189 23.2078 10.3425 23.2573 10.5 23.2573H13.5C13.6575 23.2573 13.811 23.2078 13.9387 23.1158C14.0665 23.0238 14.1621 22.8939 14.2119 22.7445L14.9751 20.452C15.28 20.3446 15.5786 20.221 15.8701 20.0814L18.0308 21.1625C18.1716 21.2329 18.3309 21.2571 18.4863 21.2319C18.6417 21.2067 18.7852 21.1332 18.8965 21.0219L21.0176 18.8993C21.1289 18.788 21.2024 18.6446 21.2276 18.4892C21.2528 18.3338 21.2286 18.1745 21.1582 18.0337L20.0815 15.8803C20.2227 15.5859 20.3468 15.2845 20.4551 14.9765L22.7402 14.2148C22.8896 14.165 23.0195 14.0694 23.1115 13.9416C23.2035 13.8139 23.253 13.6603 23.2529 13.5029V10.5029C23.253 10.3455 23.2035 10.1919 23.1115 10.0642C23.0195 9.93638 22.8896 9.8408 22.7402 9.79097L20.4536 9.02928C20.3453 8.72223 20.221 8.4219 20.0801 8.1284L21.1582 5.97214C21.2286 5.83133 21.2529 5.67197 21.2276 5.5166C21.2024 5.36122 21.1289 5.21768 21.0176 5.10638L18.8965 2.98533C18.7852 2.87402 18.6417 2.80052 18.4863 2.77529C18.3309 2.75006 18.1716 2.77439 18.0308 2.84476L15.8818 3.91847C15.5854 3.77674 15.2823 3.65201 14.9722 3.54347L14.2119 1.26272C14.1621 1.11335 14.0665 0.983378 13.9387 0.891352C13.811 0.799326 13.6575 0.74992 13.5 0.75H10.5ZM11.0405 2.24994H12.9595L13.6553 4.33881C13.6934 4.45327 13.7586 4.55691 13.8453 4.6408C13.932 4.7247 14.0377 4.78639 14.1533 4.82074C14.6414 4.96587 15.1138 5.15999 15.5625 5.40085C15.6682 5.45783 15.786 5.48858 15.9061 5.49056C16.0261 5.49253 16.1449 5.46566 16.2524 5.41218L18.2183 4.4293L19.5747 5.78572L18.5874 7.76032C18.5335 7.86793 18.5063 7.98696 18.5081 8.10729C18.5099 8.22763 18.5406 8.34579 18.5977 8.45176C18.838 8.89751 19.0334 9.36574 19.1792 9.85066C19.2136 9.96589 19.2752 10.0712 19.3588 10.1576C19.4425 10.244 19.5456 10.3091 19.6597 10.3473L21.7529 11.0445V12.9634L19.6611 13.6608C19.5471 13.6989 19.4439 13.764 19.3603 13.8504C19.2767 13.9368 19.2151 14.0421 19.1807 14.1573C19.035 14.6432 18.8396 15.1126 18.5991 15.5591C18.5421 15.6651 18.5113 15.7833 18.5096 15.9036C18.5078 16.0239 18.535 16.143 18.5889 16.2506L19.5747 18.2222L18.2183 19.5801L16.2393 18.5899C16.1316 18.5362 16.0125 18.5092 15.8922 18.5112C15.7718 18.5131 15.6537 18.544 15.5478 18.6012C15.1037 18.8402 14.6378 19.0346 14.1548 19.1799C14.0396 19.2143 13.9343 19.2759 13.8479 19.3595C13.7614 19.4432 13.6964 19.5463 13.6582 19.6603L12.9595 21.7595H11.0405L10.3418 19.6633C10.3038 19.549 10.2388 19.4455 10.1524 19.3616C10.066 19.2777 9.9606 19.2159 9.84521 19.1813C9.36038 19.0365 8.89066 18.8436 8.44482 18.6042C8.33913 18.5472 8.22129 18.5164 8.10123 18.5145C7.98117 18.5125 7.86239 18.5394 7.75488 18.5928L5.78174 19.5801L4.42529 18.2222L5.41406 16.2447C5.46794 16.1371 5.49514 16.0181 5.49336 15.8977C5.49157 15.7774 5.46085 15.6593 5.4038 15.5533C5.16422 15.1088 4.96934 14.6408 4.82372 14.1573C4.78911 14.0423 4.7274 13.9374 4.64379 13.8512C4.56019 13.7651 4.45712 13.7002 4.34325 13.6621L2.24706 12.9634V11.0445L4.33739 10.3473C4.4517 10.3093 4.55517 10.2443 4.63905 10.1578C4.72294 10.0714 4.78477 9.96605 4.81933 9.85066C4.96478 9.36389 5.15879 8.8933 5.39941 8.44588C5.45646 8.33991 5.48718 8.22175 5.48897 8.10141C5.49075 7.98107 5.46355 7.86205 5.40967 7.75443L4.42529 5.78572L5.78174 4.4293L7.75488 5.41512C7.86258 5.46884 7.98163 5.49582 8.10197 5.49384C8.22231 5.49187 8.34041 5.46101 8.44629 5.40379C8.89245 5.16341 9.36129 4.96791 9.84668 4.82221C9.9619 4.78779 10.0672 4.72624 10.1536 4.64262C10.24 4.559 10.3051 4.45578 10.3433 4.34175L11.0405 2.24994Z"
              fill={bgColor ? bgColor : 'black'}
            />
            <path
              className={styles.alone__success}
              d="M11.9974 6.74854C9.10681 6.74854 6.7489 9.11197 6.7489 12.0026C6.7489 14.8932 9.10681 17.2511 11.9974 17.2511C14.888 17.2511 17.2515 14.8932 17.2515 12.0026C17.2515 9.11197 14.888 6.74854 11.9974 6.74854ZM11.9974 8.2489C14.0774 8.2489 15.7511 9.92265 15.7511 12.0026C15.7511 14.0825 14.0774 15.7507 11.9974 15.7507C9.91747 15.7507 8.24927 14.0825 8.24927 12.0026C8.24927 9.92265 9.91747 8.2489 11.9974 8.2489Z"
              fill={bgColor ? bgColor : 'black'}
            />
          </g>
          <defs>
            <clipPath id="clip0_345_2">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconEdit;
