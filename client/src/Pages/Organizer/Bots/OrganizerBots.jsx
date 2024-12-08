import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import {
  fetchPutOrganizerBotsModerator,
  fetchGetOrganizerBotsModerator,
  fetchDeleteOrganizerBotsModerator,
} from '../../../redux/features/api/organizer/fetchOrganizerModerator';
import { getAlert } from '../../../redux/features/alertMessageSlice';
import { resetOrganizerModerator } from '../../../redux/features/api/organizer/organizerModeratorSlice';
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
  const [token, setToken] = useState({ importance: 'main' });
  useTitle('Модератор ботом');
  const { tokens, status } = useSelector((state) => state.organizerModerator);
  const dispatch = useDispatch();

  // Обработчик обновления токена и данных бота.
  const handlerEdit = (importance) => {
    setIsVisibleForm(true);
    setToken(tokens.find((elm) => elm.importance === importance));
  };

  // Обработчик удаления токена и бота.
  const handlerDelete = (tokenId) => {
    if (!tokenId) {
      dispatch(getAlert({ message: 'Не получен tokenId!', type: 'error', isOpened: true }));
      return;
    }

    const confirm = window.confirm('Вы действительно хотите удалить токен и бота с БД?');

    if (!confirm) {
      dispatch(
        getAlert({ message: 'Отмена удаления токена!', type: 'warning', isOpened: true })
      );
      return;
    }

    dispatch(fetchDeleteOrganizerBotsModerator({ tokenId })).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        dispatch(getAlert({ message: res.payload.message, type: 'success', isOpened: true }));
        dispatch(fetchGetOrganizerBotsModerator());
      }
    });
  };

  // Отправка формы.
  const sendForm = ({ username, password }) => {
    dispatch(fetchPutOrganizerBotsModerator({ organizerId, username, password })).then(
      (res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          dispatch(getAlert({ message: res.payload.message, type: 'success', isOpened: true }));
          dispatch(fetchGetOrganizerBotsModerator());
          setIsVisibleForm(false);
        }
      }
    );
  };

  // Получение данных ботов-модераторов клубов в Звифте для текущего Организатора.
  useEffect(() => {
    dispatch(fetchGetOrganizerBotsModerator());

    // Сброс данных в хранилище для текущего компонента.
    return () => dispatch(resetOrganizerModerator());
  }, []);
  return (
    <section className={styles.wrapper}>
      <p>
        "Бот" это учетная запись в Звифте через которую будет происходить управление клубами
        Организатора в которые добавлен данный Бот.
      </p>
      <p>В клубе необходимо Боту предоставить права модератора клуба.</p>
      <p>После ввода логина(email) и пароля, Звифт генерирует токен-доступа.</p>
      <p>Пароль от Бота не сохраняется в БД, сохраняется токен-доступа.</p>

      <div className={styles.spacer__cards}>
        {status !== 'loading' &&
          tokens &&
          tokens.map((token) => (
            <CardBotZwift
              token={token}
              key={token.username}
              handlerDelete={handlerDelete}
              handlerEdit={handlerEdit}
            />
          ))}
      </div>

      {/* !tokens.length если токенов нет, то добавляется новый */}
      {status !== 'loading' && (isVisibleForm || !tokens.length) && (
        <FormZwiftBot token={token} sendForm={sendForm} />
      )}
    </section>
  );
}
