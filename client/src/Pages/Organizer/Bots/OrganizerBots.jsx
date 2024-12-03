import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import {
  fetchPutOrganizerBotsModerator,
  fetchGetOrganizerBotsModerator,
} from '../../../redux/features/api/organizer/fetchOrganizerModerator';
import useTitle from '../../../hook/useTitle';
import CardBotZwift from '../../../components/CardBotZwift/CardBotZwift';

import styles from './OrganizerBots.module.css';

/**
 * Страница добавления/редактирования данных бота-модератора в Звифт.
 * Отображать состояние токена: живой или нет и когда дата истечения срока действия токена.
 */
export default function OrganizerBots() {
  useTitle('Модератор ботом');
  const { tokens } = useSelector((state) => state.organizerModerator);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetOrganizerBotsModerator());
  }, []);
  return (
    <section className={styles.wrapper}>
      {tokens && tokens.map((token) => <CardBotZwift token={token} key={token.username} />)}
    </section>
  );
}
