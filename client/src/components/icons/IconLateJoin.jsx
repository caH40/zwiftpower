import React from 'react';

import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconLateJoin({ squareSize = 24 }) {
  return (
    <MyTooltip toolTip={'Позднее подключение'}>
      <div className={styles.box__rules} style={{ width: squareSize, height: squareSize }}>
        <svg
          width="21"
          height="24"
          viewBox="0 0 21 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.9997 0C16.3194 0 18.1997 1.61178 18.1997 3.6C18.1997 5.32491 16.7844 6.76648 14.8949 7.11806L14.6563 7.15627L16.6665 9.9132L19.0797 9.08585C19.7976 8.83972 20.6124 9.13901 20.8995 9.75432C21.1661 10.3257 20.8841 10.9687 20.2677 11.2547L20.1196 11.3142L17.7064 12.1416C16.5223 12.5476 15.1789 12.2147 14.4262 11.3529L14.2922 11.1852L14.0646 10.8731L13.2162 13.7821C13.1402 14.0423 13.0174 14.2819 12.8575 14.4958L12.7307 14.6514L15.0452 16.1252C15.6 16.4784 15.9802 16.9932 16.1182 17.5684L16.1585 17.7868L16.6527 21.6H16.7997C17.5729 21.6 18.1997 22.1372 18.1997 22.8C18.1997 23.4154 17.6592 23.9226 16.963 23.9919L16.7997 24H15.525C14.7964 24 14.1759 23.564 14.0216 22.9664L13.9944 22.8258L13.3756 18.0517L8.96498 15.2434C8.88523 15.1926 8.81358 15.1358 8.75025 15.0745C7.97777 14.5442 7.56635 13.6823 7.73773 12.8058L7.78346 12.6179L8.89542 8.80542L6.69823 9.37043L5.52805 12.3794C5.28356 13.0082 4.49072 13.3481 3.75721 13.1384C3.0761 12.9439 2.68564 12.3439 2.8291 11.7559L2.87179 11.6206L4.04196 8.61148C4.30609 7.93226 4.90856 7.39297 5.67939 7.13494L5.89366 7.07165L10.7062 5.83411C10.1387 5.22026 9.79981 4.44406 9.79981 3.6C9.79981 1.61178 11.6801 0 13.9997 0ZM9.23983 15.84C9.85833 16.2377 9.98377 16.9898 9.51982 17.52L7.81717 19.4659C7.14846 20.2302 5.89968 20.4136 4.97236 19.8836L2.27071 18.3398C1.72111 18.7148 0.918607 18.6845 0.410038 18.2485C-0.136679 17.7799 -0.136679 17.0201 0.410038 16.5515L1.10192 15.9584C1.57851 15.55 2.32527 15.4866 2.88607 15.807L5.97451 17.5718L7.27986 16.08C7.74377 15.5498 8.62128 15.4423 9.23983 15.84Z"
            fill="#008600"
          />
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconLateJoin;
