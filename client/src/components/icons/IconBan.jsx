import cn from 'classnames';

import { addClasses as cns } from '../../utils/additional-classes';
import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

export function IconBan({
  getClick,
  color = '#CB0000',
  tooltip,
  addCls = ' ',
  squareSize = 24,
}) {
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
        >
          <circle
            className={styles.alone__error}
            cx="12"
            cy="12"
            r="10.5"
            stroke={color}
            strokeWidth="3"
          />
          <line
            className={styles.alone__error}
            x1="4.94972"
            y1="4.94975"
            x2="18.9497"
            y2="18.9498"
            stroke={color}
            strokeWidth="2"
          />
        </svg>
      </div>
    </MyTooltip>
  );
}
