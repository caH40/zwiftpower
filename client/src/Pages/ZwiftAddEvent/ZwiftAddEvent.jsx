import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import FormRequest from '../../components/Zwift/UI/FormRequest/FormRequest';
import DescriptionEventZwiftNew from '../../components/DescriptionEventZwiftNew/DescriptionEventZwiftNew';
import FormAdditionalParamsEvent from '../../components/UI/FormAdditionalParamsEvent/FormAdditionalParamsEvent';
import { fetchZwiftEventParams } from '../../redux/features/api/zwift_event_params/fetchZwiftEventParams';
import { resetParams } from '../../redux/features/api/zwift_event_params/zwiftEventParamsSlice';
import { fetchActualSeries } from '../../redux/features/api/series-actual/fetchActualSeries';
import { getAlert } from '../../redux/features/alertMessageSlice';
import { resetSeries } from '../../redux/features/api/series-actual/actualSeriesSlice';
import { fetchEventPost } from '../../redux/features/api/event-add/fetchEventPost';

import styles from './ZwiftAddEvent.module.css';

function ZwiftAddEvent() {
  useTitle('Zwift - Добавление заезда');
  const [eventId, setEventId] = useState({ id: 0 });
  const { eventMainParams } = useSelector((state) => state.eventParams);
  const [additionalParams, setAdditionalParams] = useState({});

  const { id: userId } = useSelector((state) => state.checkAuth.value.user);
  const { series } = useSelector((state) => state.fetchActualSeries);

  const dispatch = useDispatch();

  // запрос параметров Эвента
  useEffect(() => {
    if (eventId.id === 0) {
      return undefined;
    }
    dispatch(fetchZwiftEventParams(eventId.id));
    return () => {
      dispatch(resetParams());
    };
  }, [eventId, dispatch]);

  // запрос актуальных серий
  useEffect(() => {
    if (!eventMainParams?.name) {
      return undefined;
    }
    dispatch(fetchActualSeries());
    return () => {
      dispatch(resetSeries());
    };
  }, [eventMainParams, dispatch]);

  // добавление Эвента в БД
  const addEvent = () => {
    const isFilledFields = additionalParams.typeRaceCustom && additionalParams.organizer;
    if (!isFilledFields) {
      dispatch(
        getAlert({
          message: 'Необходимо заполнить все поля',
          type: 'error',
          isOpened: true,
        })
      );
      return;
    }

    const eventForSend = { creator: userId, ...eventMainParams, ...additionalParams };
    dispatch(fetchEventPost(eventForSend));

    setEventId({ id: 0 });
    setAdditionalParams({});
  };

  return (
    <section className={styles.block}>
      <h3 className={styles.title}>
        {'Добавление заезда из Звифта для отслеживания результатов'}
      </h3>
      <div className={styles.group}>
        <FormRequest name={'Id Event'} setState={setEventId} />
      </div>
      {eventMainParams?.name && (
        <>
          <DescriptionEventZwiftNew event={eventMainParams} />
          <FormAdditionalParamsEvent
            form={additionalParams}
            setForm={setAdditionalParams}
            series={series}
            sendForm={addEvent}
          />
        </>
      )}
    </section>
  );
}

export default ZwiftAddEvent;
