import cn from 'classnames';

import styles from './SkeletonProfileBlock.module.css';
/**
 * Компонент для отображения схемы блока Профиля во время загрузки.
 * @param {'loading' | 'resolved' | 'rejected'} status - Статус загрузки данных.
 * @returns {JSX.Element} - JSX элемент схемы блока Профиля во время загрузки.
 */
function SkeletonProfileCPBlock({ status }) {
  return (
    status === 'loading' && (
      <div className={styles.wrapper}>
        <section className={styles.block__bars}>
          <div>
            <div className={cn(styles.text, styles.label)} />
            {[1, 2, 3, 4].map((elm) => (
              <div key={elm} className={styles.bar} />
            ))}
          </div>
          <div>
            <div className={cn(styles.text, styles.label)} />
            {[1, 2, 3, 4].map((elm) => (
              <div key={elm} className={styles.bar} />
            ))}
          </div>
        </section>
      </div>
    )
  );
}

export default SkeletonProfileCPBlock;
