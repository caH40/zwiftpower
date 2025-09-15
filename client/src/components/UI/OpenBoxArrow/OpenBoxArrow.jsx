import IconOpenBox from '../../icons/IconOpenBox';
import IconCloseBox from '../../icons/IconCloseBox';

import styles from './OpenBoxArrow.module.css';

function OpenBoxArrow({ isOpened, getClick, tooltip, color, pulse }) {
  return (
    <div className={styles.box__open} onClick={getClick}>
      {isOpened ? (
        <IconOpenBox squareSize={28} color={color} pulse={pulse} />
      ) : (
        <IconCloseBox squareSize={28} tooltip={tooltip} color={color} pulse={pulse} />
      )}
    </div>
  );
}

export default OpenBoxArrow;
