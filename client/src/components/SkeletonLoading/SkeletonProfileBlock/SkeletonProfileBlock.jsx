import cn from 'classnames';

import styles from './SkeletonProfileBlock.module.css';
/**
 * Компонент для отображения схемы блока Профиля во время загрузки.
 * @param {'loading' | 'resolved' | 'rejected'} status - Статус загрузки данных.
 * @returns {JSX.Element} - JSX элемент схемы блока Профиля во время загрузки.
 */
function SkeletonProfileBlock({ status }) {
  return (
    status === 'loading' && (
      <div className={styles.wrapper}>
        <section className={styles.block__info}>
          <div className={styles.logo} />
          <div className={styles.params}>
            {[1, 2, 3, 4, 5].map((elm) => (
              <div className={styles.box__text} key={elm}>
                <div className={cn(styles.text, styles.text__label)} />
                <div className={styles.text} />
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  );
}

export default SkeletonProfileBlock;
