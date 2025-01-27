import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconOpenBox({ squareSize = 24, tooltip, color = '#FF7C00' }) {
  return (
    <MyTooltip tooltip={tooltip}>
      <div className={styles.box} style={{ width: squareSize, height: squareSize }}>
        <svg
          width="27"
          height="26"
          viewBox="0 0 27 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1H26V25H1V1Z" fill={color} stroke="white" strokeWidth="2" />
          <line
            y1="-1.5"
            x2="12.9126"
            y2="-1.5"
            transform="matrix(-0.733277 -0.67993 0.707107 -0.707107 22.5991 14.7795)"
            stroke="white"
            strokeWidth="3"
          />
          <line
            y1="-1.5"
            x2="12.9126"
            y2="-1.5"
            transform="matrix(-0.707107 0.707107 -0.733277 -0.67993 13.1306 6)"
            stroke="white"
            strokeWidth="3"
          />
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconOpenBox;
