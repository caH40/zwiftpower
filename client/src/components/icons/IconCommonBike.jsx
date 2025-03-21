import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconCommonBike({ squareSize = 24 }) {
  return (
    <MyTooltip tooltip={'Единые характеристики для всех велосипедов'}>
      <div className={styles.box__rules} style={{ width: squareSize, height: squareSize }}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_1298_2)">
            <path d="M4 14L20 14" stroke="#FF7C00" strokeWidth="3" strokeLinecap="round" />
            <path d="M4 10L20 10" stroke="#FF7C00" strokeWidth="3" strokeLinecap="round" />
            <rect x="0.5" y="0.5" width="23" height="23" stroke="#FF7C00" />
          </g>
          <defs>
            <clipPath id="clip0_1298_2">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconCommonBike;
