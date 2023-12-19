import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconRules({ squareSize = 24, tooltip }) {
  return (
    <MyTooltip tooltip={tooltip}>
      <div className={styles.box__rules} style={{ width: squareSize, height: squareSize }}>
        <svg
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.85 1.8L10.5 0L8.15 1.8L5.25 1.4L4.15 4.15L1.4 5.25L1.8 8.15L0 10.5L1.8 12.85L1.4 15.75L4.15 16.85L5.25 19.6L8.15 19.2L10.5 21L12.85 19.2L15.75 19.6L16.85 16.85L19.6 15.75L19.2 12.85L21 10.5L19.2 8.15L19.6 5.25L16.85 4.15L15.75 1.4L12.85 1.8ZM9 12.6L15.8 5.8L17.2 7.2L9 15.4L4.8 11.2L6.2 9.8L9 12.6Z"
            fill="black"
          />
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconRules;
