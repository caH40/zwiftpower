import { useParams } from 'react-router-dom';

import useTitle from '../../hook/useTitle';

import styles from './UserModerationActivities.module.css';

export default function UserModerationActivities() {
  useTitle('Модерация активностей пользователя');
  const { _id } = useParams();

  return <section className={styles.wrapper}></section>;
}
