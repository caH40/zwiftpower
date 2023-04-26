import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import useTitle from '../../hook/useTitle';
import FormRequest from '../../components/Zwift/UI/FormRequest/FormRequest';
import { changeZwiftEvents, getZwiftEvents } from '../../api/zwift/events';
import { getAlert } from '../../redux/features/alertMessageSlice';
import { resetParams, setEventParams } from '../../redux/features/eventParamsSlice';
import Button from '../../components/UI/Button/Button';
import FormEditEvent from '../../components/Zwift/UI/FormEditEvent/FormEditEvent';
import FormEditEventGroup from '../../components/Zwift/UI/FormEditEventGroup/FormEditEventGroup';
import JSONBlock from '../../components/JSONBlock/JSONBlock';
import useBackground from '../../hook/useBackground';

import styles from './ZwiftEditEvent.module.css';
import { prepareData } from './utils/preparation';

function ZwiftEditEvent() {
  const { id } = useParams();
  const [eventId, setEventId] = useState({ id: id || 0 });

  useEffect(() => {
    if (eventId.id === 0) return;
    fetchEventParams();
  }, [id]); // eslint-disable-line

  const {
    eventMainParams,
    eventSubgroup_0,
    eventSubgroup_1,
    eventSubgroup_2,
    eventSubgroup_3,
    eventSubgroup_4,
    selectedRules,
  } = useSelector((state) => state.eventParams);
  useTitle('Zwift - Редактирование заезда');
  useBackground(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const fetchEventParams = () => {
    if (!eventId.id)
      return dispatch(
        getAlert({ message: 'Необходимо ввести id заезда!', type: 'warning', isOpened: true })
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

  const sendNewEventParams = () => {
    const eventForPost = prepareData(
      eventMainParams,
      eventSubgroup_0,
      eventSubgroup_1,
      eventSubgroup_2,
      eventSubgroup_3,
      eventSubgroup_4,
      selectedRules
    );

    changeZwiftEvents(eventForPost)
      .then((data) => {
        dispatch(getAlert({ message: data.data?.message, type: 'success', isOpened: true }));
        dispatch(resetParams());
      })
      .catch((error) => {
        dispatch(
          getAlert({
            message: error.response
              ? JSON.stringify(error.response.data.message)
              : 'Непредвиденная ошибка',
            type: 'error',
            isOpened: true,
          })
        );
      });
    return false;
  };
  return (
    <section className={styles.block}>
      <h3 className={styles.title}>{'Изменение данных создаваемого заезда в Звифте'}</h3>
      <div className={styles.group}>
        <FormRequest
          name={'Id изменяемого Event'}
          state={eventId}
          setState={setEventId}
          sendForm={fetchEventParams}
        />
      </div>
      {eventMainParams.worldId ? (
        <>
          <div className={styles.group}>
            <FormEditEvent />
          </div>
          <FormEditEventGroup sendForm={sendNewEventParams} />
          <Button getClick={goBack}>назад</Button>
        </>
      ) : undefined}
      <JSONBlock json={eventMainParams} />
    </section>
  );
}

export default ZwiftEditEvent;
