import useTitle from '../../../hook/useTitle';

import styles from './Organizer.module.css';

/**
 * Layer для страниц управления организатором.
 * 3. Редактирование названия;
 * 4. Редактирование лейбла;
 * 5. Редактирование фоновая картинки;
 * 6. Редактирование описания;
 */
export default function Organizer() {
  useTitle('Управление Организатором');
  return <section className={styles.wrapper}>Organizer</section>;
}
