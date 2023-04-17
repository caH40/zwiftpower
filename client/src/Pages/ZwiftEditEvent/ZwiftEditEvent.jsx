import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useTitle from '../../hook/useTitle';
import FormRequest from '../../components/Zwift/UI/FormRequest/FormRequest';
import { getZwiftEvents } from '../../api/zwift/events';
import { getAlert } from '../../redux/features/alertMessageSlice';
import { setEventParams } from '../../redux/features/eventParamsSlice';
import { syntaxHighlight } from '../../utils/hightlight';
import Button from '../../components/UI/Button/Button';
import FormEditEvent from '../../components/Zwift/UI/FormEditEvent/FormEditEvent';

import styles from './ZwiftEditEvent.module.css';

function ZwiftEditEvent() {
  const [eventId, setEventId] = useState({ id: 0 });
  const { eventMainParams } = useSelector((state) => state.eventParams);
  useTitle('Zwift - Редактирование заезда');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const sendFormId = () => {
    if (!eventId.id)
      return dispatch(
        getAlert({ message: 'Необходимо заполнить все поля!', type: 'warning', isOpened: true })
      );
    getZwiftEvents(eventId.id)
      .then((response) => {
        dispatch(setEventParams(response.data));
        dispatch(getAlert({ message: 'Данные получены', type: 'success', isOpened: true }));
      })
      .catch((error) =>
        dispatch(
          getAlert({
            message: error.response ? error.response.data.message : 'Непредвиденная ошибка',
            type: 'error',
            isOpened: true,
          })
        )
      );
    return false;
  };
  return (
    <section className={styles.block}>
      <h3 className={styles.title}>{'Изменение данных создаваемого заезда в Звифте'}</h3>
      <FormRequest
        name={'Id изменяемого Event'}
        state={eventId}
        setState={setEventId}
        sendForm={sendFormId}
      />
      {eventMainParams.worldId ? (
        <>
          <FormEditEvent />
          <Button getClick={goBack}>назад</Button>
        </>
      ) : undefined}
      <div className={styles.group}>
        <pre
          dangerouslySetInnerHTML={{
            __html: syntaxHighlight(JSON.stringify(eventMainParams, undefined, 4)),
          }}
        />
      </div>
    </section>
  );
}

export default ZwiftEditEvent;
