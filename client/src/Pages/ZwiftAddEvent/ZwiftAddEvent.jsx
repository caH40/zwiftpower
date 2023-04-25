import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';
import FormRequest from '../../components/Zwift/UI/FormRequest/FormRequest';
import { getZwiftEvents, postEvent } from '../../api/zwift/events';
import { getAlert } from '../../redux/features/alertMessageSlice';
import DescriptionEventZwift from '../../components/DescriptionEventZwift/DescriptionEventZwift';
import FormAdditionalParamsEvent from '../../components/UI/FormAdditionalParamsEvent/FormAdditionalParamsEvent';

import styles from './ZwiftAddEvent.module.css';

function ZwiftAddEvent() {
  const [eventId, setEventId] = useState({ id: 0 });
  const [event, setEvent] = useState({});
  const [form, setForm] = useState({});
  console.log(form);
  useTitle('Zwift - Добавление заезда');
  useBackground(false);
  const dispatch = useDispatch();

  const fetchEventParams = () => {
    if (!eventId.id)
      return dispatch(
        getAlert({ message: 'Необходимо ввести Id заезда!', type: 'warning', isOpened: true })
      );
    getZwiftEvents(eventId.id)
      .then((response) => {
        setEvent(response.data);
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
    postEvent(event).catch((error) => {
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
      {event.id && (
        <>
          <DescriptionEventZwift event={event} />
          <FormAdditionalParamsEvent form={form} setForm={setForm} />
        </>
      )}
    </section>
  );
}

export default ZwiftAddEvent;
