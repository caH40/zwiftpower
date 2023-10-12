import IconOpenBox from '../../icons/IconOpenBox';
import IconCloseBox from '../../icons/IconCloseBox';

import styles from './OpenBoxArrow.module.css';

function OpenBoxArrow({ isOpened, getClick }) {
  return (
    <div className={styles.box__open} onClick={getClick}>
      {isOpened ? <IconOpenBox squareSize={22} /> : <IconCloseBox squareSize={22} />}
    </div>
  );
}

export default OpenBoxArrow;
