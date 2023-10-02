import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import useTitle from '../../hook/useTitle';
import FormRequest from '../../components/Zwift/UI/FormRequest/FormRequest';
import { changeZwiftEvents } from '../../api/zwift/events';
import { getAlert } from '../../redux/features/alertMessageSlice';

import Button from '../../components/UI/Button/Button';
import FormEditEvent from '../../components/Zwift/UI/FormEditEvent/FormEditEvent';
import FormEditEventGroup from '../../components/Zwift/UI/FormEditEventGroup/FormEditEventGroup';
import JSONBlock from '../../components/JSONBlock/JSONBlock';
import useBackground from '../../hook/useBackground';
import { fetchZwiftEventParams } from '../../redux/features/api/zwift_event_params/fetchZwiftEventParams';
import {
  resetParams,
  setPattern,
} from '../../redux/features/api/zwift_event_params/zwiftEventParamsSlice';
import FormPattern from '../../components/Zwift/UI/FormEditEvent/FormPattern';

import styles from './ZwiftEditEvent.module.css';
import { prepareData } from './utils/preparation';

function ZwiftEditEvent() {
  const { id } = useParams();
  const [eventId, setEventId] = useState({ id: id || 0 });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (eventId.id === 0) {
      return undefined;
    }
    dispatch(fetchZwiftEventParams(eventId.id));

    return () => {
      dispatch(resetParams());
    };
  }, [eventId, dispatch]);

  const {
    eventMainParams,
    eventSubgroup_0,
    eventSubgroup_1,
    eventSubgroup_2,
    eventSubgroup_3,
    eventSubgroup_4,
    checkboxRules,
    checkboxTags,
  } = useSelector((state) => state.eventParams);

  useTitle('Zwift - Редактирование заезда');
  useBackground(false);

  const goBack = () => navigate(-1);

  const sendNewEventParams = () => {
    const eventForPost = prepareData(
      eventMainParams,
      eventSubgroup_0,
      eventSubgroup_1,
      eventSubgroup_2,
      eventSubgroup_3,
      eventSubgroup_4,
      checkboxRules,
      checkboxTags
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

  const activatePattern = (pattern) => {
    try {
      dispatch(setPattern(pattern));
    } catch (error) {
      dispatch(getAlert({ message: error.message, type: 'error', isOpened: true }));
    }
  };

  return (
    <section className={styles.block}>
      <h3 className={styles.title}>{'Изменение данных создаваемого заезда в Звифте'}</h3>
      <div className={styles.group}>
        <FormRequest name={'Id изменяемого Event'} setState={setEventId} />
      </div>
      {eventMainParams.worldId ? (
        <>
          <div className={styles.group}>
            <FormPattern activatePattern={activatePattern} />
          </div>
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
