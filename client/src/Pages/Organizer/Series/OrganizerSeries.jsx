import useTitle from '../../../hook/useTitle';

import styles from './OrganizerSeries.module.css';

/**
 * Страница создания/редактирования Серий заездов.
 *
 * @param {Object} props - Пропсы.
 * @param {string} props.organizerId - _id организатора в БД.
 */
export default function OrganizerSeries({ organizerId }) {
  useTitle('Серии заездов');

  return (
    <section className={styles.wrapper}>
      <p>Страница создания/редактирования Серий заездов.</p>
    </section>
  );
}
