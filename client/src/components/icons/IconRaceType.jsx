import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconRaceType({ isActive, squareSize = 24, tooltip }) {
  const activeColorFill = isActive ? styles.active__fill : undefined;
  return (
    <MyTooltip tooltip={tooltip}>
      <div className={styles.box__rules} style={{ width: squareSize, height: squareSize }}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className={activeColorFill}
            d="M11.8865 3.07918C11.6433 2.97361 11.3572 2.97361 11.114 3.07918L2.47765 6.82918C2.18507 6.95622 2.00024 7.21592 2.00024 7.5C2.00024 7.78408 2.18507 8.04378 2.47765 8.17082L11.114 11.9208C11.3572 12.0264 11.6433 12.0264 11.8865 11.9208L20.5229 8.17082C20.8154 8.04378 21.0002 7.78408 21.0002 7.5C21.0002 7.21592 20.8154 6.95622 20.5229 6.82918L11.8865 3.07918Z"
            fill="black"
          />
          <path
            className={activeColorFill}
            d="M2.09136 15.395C2.30467 15.0422 2.82342 14.8992 3.25003 15.0755L11.5 18.4871L19.75 15.0755C20.1766 14.8992 20.6954 15.0422 20.9086 15.395C21.1219 15.7478 20.949 16.1768 20.5224 16.3533L11.8862 19.9246C11.6431 20.0251 11.3569 20.0251 11.1138 19.9246L2.47759 16.3533C2.05098 16.1768 1.87806 15.7478 2.09136 15.395Z"
            fill="black"
          />
          <path
            className={activeColorFill}
            d="M3.25003 11.0755C2.82342 10.8992 2.30467 11.0422 2.09136 11.395C1.87806 11.7478 2.05098 12.1768 2.47759 12.3533L11.1138 15.9246C11.3569 16.0251 11.6431 16.0251 11.8862 15.9246L20.5224 12.3533C20.949 12.1768 21.1219 11.7478 20.9086 11.395C20.6954 11.0422 20.1766 10.8992 19.75 11.0755L11.5 14.4871L3.25003 11.0755Z"
            fill="black"
          />
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconRaceType;
