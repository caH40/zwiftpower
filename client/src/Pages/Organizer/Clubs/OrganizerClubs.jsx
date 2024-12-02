import useTitle from '../../../hook/useTitle';

import styles from './OrganizerClubs.module.css';

/**
 * Страница добавления/редактирования клубов организатора и модераторов в нём.
 */
export default function OrganizerClubs() {
  useTitle('Управление Клубами');
  return <section className={styles.wrapper}>OrganizerClubs</section>;
}
