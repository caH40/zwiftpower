import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconRules({ squareSize = 24, tooltip }) {
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
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.2381 3.71429L12 2L9.7619 3.71429L7 3.33333L5.95238 5.95238L3.33333 7L3.71429 9.7619L2 12L3.71429 14.2381L3.33333 17L5.95238 18.0476L7 20.6667L9.7619 20.2857L12 22L14.2381 20.2857L17 20.6667L18.0476 18.0476L20.6667 17L20.2857 14.2381L22 12L20.2857 9.7619L20.6667 7L18.0476 5.95238L17 3.33333L14.2381 3.71429ZM10.5842 13.8519L17.2867 7.55556L18.6667 8.85185L10.5842 16.4444L6.44444 12.5556L7.82437 11.2593L10.5842 13.8519Z"
            fill="black"
          />
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconRules;
