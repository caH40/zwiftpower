import useTitle from '../../hook/useTitle';

import styles from './Organizer.module.css';

/**
 * Страница управления организатором.
 * 1. Добавление бота; Первоначально попробовать генерировать и сохранять token в БД.
 * 2. Добавление клубов и модераторов к нему;
 * 3. Редактирование названия;
 * 4. Редактирование лейбла;
 * 5. Редактирование фоновая картинки;
 * 6. Редактирование описания;
 */
export default function Organizer() {
  useTitle('Управление Организатором');
  return <div className={styles.wrapper}>Organizer</div>;
}
