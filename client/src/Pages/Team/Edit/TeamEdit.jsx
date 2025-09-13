import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import useTitle from '../../../hook/useTitle';

import styles from './TeamEdit.module.css';

/**
 * Страница управления/редактирования командой.
 */
export default function TeamEditPage() {
  useTitle('Управление командой');

  const { team } = useSelector((state) => state.team);

  const dispatch = useDispatch();

  console.log(team);

  const { urlSlug } = useParams();

  return <div className={styles.wrapper}></div>;
}
