import useTitle from '../../hook/useTitle';

import styles from './SeriesOne.module.css';

/**
 * Страница Серии заездов. Описание, итоговые таблицы.
 */
export default function SeriesOne() {
  useTitle('Серия заездов ......');
  return <section className={styles.wrapper}>SeriesOne</section>;
}
