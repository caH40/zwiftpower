import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';
import FormRequest from '../../components/Zwift/UI/FormRequest/FormRequest';
import { getZwiftEvents, postEvent } from '../../api/zwift/events';
import { getAlert } from '../../redux/features/alertMessageSlice';
import { getLocalDate } from '../../utils/date-convert';
import Button from '../../components/UI/Button/Button';

import styles from './ZwiftAddEvent.module.css';

function ZwiftAddEvent() {
  const [eventId, setEventId] = useState({ id: 0 });
  const [eventParams, setEventParams] = useState({});

  useTitle('Zwift - Добавление заезда');
  useBackground(false);
  const dispatch = useDispatch();

  const fetchEventParams = () => {
    if (!eventId.id)
      return dispatch(
        getAlert({ message: 'Необходимо заполнить все поля!', type: 'warning', isOpened: true })
      );
    getZwiftEvents(eventId.id)
      .then((response) => {
        setEventParams(response.data);
        dispatch(getAlert({ message: 'Данные получены', type: 'success', isOpened: true }));
      })
      .catch((error) => {
        dispatch(
          getAlert({
            message: error.response ? error.response.data.message : 'Непредвиденная ошибка',
            type: 'error',
            isOpened: true,
          })
        );
      });
    return false;
  };

  const addEvent = () =>
    postEvent(eventParams.id).catch((error) => {
      const message = error.response
        ? JSON.stringify(error.response.data.message || error.message)
        : 'Непредвиденная ошибка';
      dispatch(
        getAlert({
          message,
          type: 'error',
          isOpened: true,
        })
      );
    });

  return (
    <section className={styles.block}>
      <h3 className={styles.title}>
        {'Добавление заезда из Звифта для отслеживания результатов'}
      </h3>
      <div className={styles.group}>
        <FormRequest
          name={'Id Event'}
          state={eventId}
          setState={setEventId}
          sendForm={fetchEventParams}
        />
      </div>
      {eventParams.id && (
        <>
          <div className={styles.group}>
            <h3 className={styles.h3}>{eventParams.name}</h3>
            <h4 className={styles.h4}>{getLocalDate(eventParams.eventStart)}</h4>
            <img className={styles.poster} src={eventParams.imageUrl} alt="poster" />
            <p className={styles.paragraph}>{eventParams.description}</p>
            <div className={styles.right}>
              <Button getClick={addEvent}>Добавить</Button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default ZwiftAddEvent;
