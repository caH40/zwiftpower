import useTitle from '../../hook/useTitle';

import styles from './Organizer.module.css';

/**
 * Страница организатора.
 */
export default function Organizer() {
  useTitle('Управление Организатором');
  return <div className={styles.wrapper}>Organizer</div>;
}
