import { useEffect, useState } from 'react';
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
import { resetEventIdCreated } from '../../redux/features/api/event-create/eventCreateSlice';

import styles from './ZwiftAddEvent.module.css';

function ZwiftAddEvent() {
  const { eventId } = useSelector((state) => state.fetchEventCreate);
  useTitle('Добавление заезда из Zwift');
  const { eventMainParams } = useSelector((state) => state.eventParams);
  const [additionalParams, setAdditionalParams] = useState({ seriesId: null });

  const { id: userId } = useSelector((state) => state.checkAuth.value.user);
  const { series } = useSelector((state) => state.fetchActualSeries);

  const dispatch = useDispatch();

  // запрос актуальных серий
  useEffect(() => {
    return () => {
      dispatch(resetSeries());
      dispatch(resetParams());
    };
  }, []);

  // запрос параметров Эвента
  useEffect(() => {
    if (eventId === 0) {
      return;
    }
    dispatch(fetchZwiftEventParams(eventId));
    dispatch(resetEventIdCreated());
  }, [eventId, dispatch]);

  // запрос актуальных серий
  useEffect(() => {
    if (!eventMainParams?.name) {
      return;
    }
    dispatch(fetchActualSeries());
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

    setAdditionalParams({});
  };

  return (
    <section className={styles.block}>
      <h3 className={styles.title}>
        {'Добавление заезда из Звифта для отслеживания результатов'}
      </h3>
      <div className={styles.group}>
        <FormRequest name={'Id Event'} />
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
