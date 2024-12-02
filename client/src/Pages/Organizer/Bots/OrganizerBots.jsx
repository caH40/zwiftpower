import useTitle from '../../../hook/useTitle';

import styles from './OrganizerBots.module.css';

/**
 * Страница добавления/редактирования данных бота-модератора в Звифт.
 * Отображать состояние токена: живой или нет и когда дата истечения срока действия токена.
 */
export default function OrganizerBots() {
  useTitle('Модератор ботом');
  return <section className={styles.wrapper}>OrganizerBot</section>;
}
