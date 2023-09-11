import MyTooltip from '../../HOC/MyTooltip';

import styles from './DSQBox.module.css';

const DSQBox = ({ children, tooltip }) => {
  return (
    <MyTooltip tooltip={tooltip}>
      <div className={styles.box}>{children}</div>
    </MyTooltip>
  );
};

export default DSQBox;
