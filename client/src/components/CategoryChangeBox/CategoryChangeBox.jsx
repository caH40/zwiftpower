import MyTooltip from '../../HOC/MyTooltip';

import styles from './CategoryChangeBox.module.css';

/**
 * Отображает переход из PrevCategory в Category.
 */
export default function CategoryChangeBox({ PrevCategory, Category, reason }) {
  return (
    <MyTooltip tooltip={reason}>
      <div className={styles.wrapper}>
        <div className={styles.prev}>{PrevCategory}</div>
        <div className={styles.current}>{Category}</div>
      </div>
    </MyTooltip>
  );
}
