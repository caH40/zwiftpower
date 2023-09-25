import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconArrows({ squareSize = 24, getClick, tooltip, columnName, activeDate }) {
  return (
    <MyTooltip tooltip={tooltip}>
      <div
        className={styles.box__rules}
        style={{ width: squareSize, height: squareSize }}
        onClick={() => getClick(columnName)}
      >
        <svg
          width="14"
          height="15"
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.81818 0L12.7229 6.64773L0.913463 6.64773L6.81818 0Z"
            fill={
              activeDate.isActive ? (activeDate.isRasing ? '#a65100' : '#ebebeb') : '#ebebeb'
            }
          />
          <path
            d="M6.81817 15L0.913451 8.35227L12.7229 8.35227L6.81817 15Z"
            fill={
              activeDate.isActive ? (activeDate.isRasing ? '#ebebeb' : '#a65100') : '#ebebeb'
            }
          />
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconArrows;
