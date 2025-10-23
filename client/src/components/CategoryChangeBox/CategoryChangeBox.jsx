import MyTooltip from '../../HOC/MyTooltip';

import styles from './CategoryChangeBox.module.css';

/**
 * Отображает переход из PrevCategory в Category.
 */
export default function CategoryChangeBox({ PrevCategory, Category, modifiedCategory }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.prev}>{PrevCategory}</div>

      <MyTooltip tooltip={modifiedCategory?.reason}>
        <div className={styles.circlesContainer}>
          <div className={styles.arrow}></div>
        </div>
      </MyTooltip>

      <div className={styles.current}>{Category}</div>
    </div>
  );
}
