import IconOpenBox from '../../icons/IconOpenBox';
import IconCloseBox from '../../icons/IconCloseBox';

import styles from './OpenBoxArrow.module.css';

function OpenBoxArrow({ isOpened, getClick, tooltip, color }) {
  return (
    <div className={styles.box__open} onClick={getClick}>
      {isOpened ? (
        <IconOpenBox squareSize={22} color={color} />
      ) : (
        <IconCloseBox squareSize={22} tooltip={tooltip} color={color} />
      )}
    </div>
  );
}

export default OpenBoxArrow;
