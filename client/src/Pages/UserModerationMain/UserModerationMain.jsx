import { useParams } from 'react-router-dom';

import useTitle from '../../hook/useTitle';

import styles from './UserModerationMain.module.css';

export default function UserModerationMain() {
  useTitle('Главная страница модерации пользователя');
  const { _id } = useParams();

  return (
    <section className={styles.wrapper}>
      <h2>В разработке!</h2>
    </section>
  );
}
