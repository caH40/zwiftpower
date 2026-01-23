import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

/**
 * Иконка щит с галкой по середине.
 */
function IconAddByModerator({ squareSize = 24, tooltip }) {
  return (
    <MyTooltip tooltip={tooltip || 'Добавлено модератором'}>
      <div className={styles.box__rules} style={{ width: squareSize, height: squareSize }}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.8889 1L2 4.14286V10.4286C2 16.2429 6.26667 21.68 12 23C17.7333 21.68 22 16.2429 22 10.4286V4.14286L13.1111 1H10.8889Z"
            fill="#10B981"
          />
          <path d="M7 11L10.75 15L17 7" stroke="white" strokeWidth="2" />
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconAddByModerator;
