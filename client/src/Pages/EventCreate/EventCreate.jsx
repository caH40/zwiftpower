import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import useTitle from '../../hook/useTitle';
import { getAlert } from '../../redux/features/alertMessageSlice';
import { getZwiftEvents } from '../../api/zwift/events';
import FormRequest from '../../components/UI/FormRequest/FormRequest';
import FormEditEvent from '../../components/UI/FormEditEvent/FormEditEvent';

import styles from './EventCreate.module.css';

function EventCreate() {
  const [event, setEvent] = useState({ id: 0 });

  useTitle('Создание заезда');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const sendForm = () => {
    // // if (!isValidSeries(series))
    // //   return dispatch(
    // //     getAlert({ message: 'Необходимо заполнить все поля!', type: 'warning', isOpened: true })
    // //   );
    // getZwiftEvents(event.id)
    //   .then((data) => {
    //     console.log(data);
    //     // dispatch(getAlert({ message: data.data?.message, type: 'success', isOpened: true }));
    //     // navigate('/edit/series/');
    //   })
    //   .catch((error) =>
    //     dispatch(
    //       getAlert({
    //         message: 'Ошибка при обработке данных заезда!',
    //         type: 'error',
    //         isOpened: true,
    //       })
    //     )
    //   );
    return false;
  };

  const sendFormId = () => {
    if (!event.id)
      return dispatch(
        getAlert({ message: 'Необходимо заполнить все поля!', type: 'warning', isOpened: true })
      );
    getZwiftEvents(event.id)
      .then((response) => {
        setEvent(response.data);
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
        state={event}
        setState={setEvent}
        sendForm={sendFormId}
      />
      {event.worldId ? (
        <>
          <FormEditEvent form={event} setForm={setEvent} sendForm={sendForm} />
          <Button getClick={goBack}>назад</Button>
        </>
      ) : undefined}
    </section>
  );
}

export default EventCreate;
