import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import {
  fetchPutOrganizerBotsModerator,
  fetchGetOrganizerBotsModerator,
} from '../../../redux/features/api/organizer/fetchOrganizerModerator';
import useTitle from '../../../hook/useTitle';
import CardBotZwift from '../../../components/CardBotZwift/CardBotZwift';
import FormZwiftBot from '../../../components/UI/FormZwiftBot/FormZwiftBot';

import styles from './OrganizerBots.module.css';

/**
 * Страница добавления/редактирования данных бота-модератора в Звифт.
 * Отображать состояние токена: живой или нет и когда дата истечения срока действия токена.
 *
 * @param {Object} props - Пропсы.
 * @param {string} props.organizerId - _id организатора в БД.
 */
export default function OrganizerBots({ organizerId }) {
  const [isVisibleForm, setIsVisibleForm] = useState(false);
  const [token, setToken] = useState(null);
  useTitle('Модератор ботом');
  const { tokens } = useSelector((state) => state.organizerModerator);
  const dispatch = useDispatch();

  const handlerEdit = (importance) => {
    setIsVisibleForm(true);
    setToken(tokens.find((elm) => elm.importance === importance));
  };
  const handlerDelete = () => {};

  // Отправка формы.
  const sendForm = ({ username, password }) => {
    dispatch(fetchPutOrganizerBotsModerator({ organizerId, username, password }));
  };

  useEffect(() => {
    dispatch(fetchGetOrganizerBotsModerator());
  }, []);
  return (
    <section className={styles.wrapper}>
      <div className={styles.spacer__cards}>
        {tokens &&
          tokens.map((token) => (
            <CardBotZwift
              token={token}
              key={token.username}
              handlerDelete={handlerDelete}
              handlerEdit={handlerEdit}
            />
          ))}
      </div>

      {isVisibleForm && <FormZwiftBot token={token} sendForm={sendForm} />}
    </section>
  );
}
