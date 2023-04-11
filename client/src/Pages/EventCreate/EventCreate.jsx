import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import useTitle from '../../hook/useTitle';
import { getAlert } from '../../redux/features/alertMessageSlice';
import { getZwiftEvents } from '../../api/zwift/events';
import FormRequest from '../../components/UI/FormRequest/FormRequest';
import FormEditEvent from '../../components/UI/FormEditEvent/FormEditEvent';
import FormEditEventGroup from '../../components/UI/FormEditEventGroup/FormEditEventGroup';

import styles from './EventCreate.module.css';

function EventCreate() {
  const [event, setEvent] = useState({ id: 0 });
  const [subGroup_0, setSubGroup_0] = useState([]);
  const [subGroup_1, setSubGroup_1] = useState([]);
  const [subGroup_2, setSubGroup_2] = useState([]);
  const [subGroup_3, setSubGroup_3] = useState([]);
  const [subGroup_4, setSubGroup_4] = useState([]);

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
        setSubGroup_0(response.data.eventSubgroups[0]);
        setSubGroup_1(response.data.eventSubgroups[1]);
        setSubGroup_2(response.data.eventSubgroups[2]);
        setSubGroup_3(response.data.eventSubgroups[3]);
        setSubGroup_4(response.data.eventSubgroups[4]);
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
          <FormEditEvent form={event} setForm={setEvent} />
          <FormEditEventGroup
            subGroup_0={subGroup_0}
            subGroup_1={subGroup_1}
            subGroup_2={subGroup_2}
            subGroup_3={subGroup_3}
            subGroup_4={subGroup_4}
            setSubGroup_0={setSubGroup_0}
            setSubGroup_1={setSubGroup_1}
            setSubGroup_2={setSubGroup_2}
            setSubGroup_3={setSubGroup_3}
            setSubGroup_4={setSubGroup_4}
          />
          <Button getClick={goBack}>назад</Button>
        </>
      ) : undefined}
    </section>
  );
}

export default EventCreate;
