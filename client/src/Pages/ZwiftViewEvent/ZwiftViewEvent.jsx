import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { fetchZwiftEventParams } from '../../redux/features/api/zwift_event_params/fetchZwiftEventParams';
import { resetEventIdCreated } from '../../redux/features/api/event-create/eventCreateSlice';
import { resetParams } from '../../redux/features/api/zwift_event_params/zwiftEventParamsSlice';
import useTitle from '../../hook/useTitle';
import JSONBlock from '../../components/JSONBlock/JSONBlock';
import FormRequest from '../../components/Zwift/UI/FormRequest/FormRequest';

import styles from './ZwiftViewEvent.module.css';

/**
 * Страница "Просмотр настроек заезда"
 */
function ZwiftViewEvent() {
  useTitle('Просмотр настроек заезда в Zwift');
  const { eventId } = useSelector((state) => state.fetchEventCreate);
  const eventParams = useSelector((state) => state.eventParams);
  const dispatch = useDispatch();

  useEffect(() => {
    if (eventId === 0) {
      return undefined;
    }

    dispatch(fetchZwiftEventParams({ eventId, forView: true }));
    dispatch(resetEventIdCreated());

    return () => {
      dispatch(resetParams());
    };
  }, [eventId, dispatch]);

  return (
    <section className={styles.block}>
      <h3 className={styles.title}>{'Данные заезда Звифте'}</h3>
      <div className={styles.group}>
        <FormRequest name={'Id изменяемого Event'} />
      </div>
      <JSONBlock json={eventParams?.eventMainParams} />
    </section>
  );
}

export default ZwiftViewEvent;
