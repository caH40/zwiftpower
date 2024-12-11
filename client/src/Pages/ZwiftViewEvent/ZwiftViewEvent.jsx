import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { fetchZwiftEventParams } from '../../redux/features/api/zwift_event_params/fetchZwiftEventParams';
import { resetEventIdCreated } from '../../redux/features/api/event-create/eventCreateSlice';
import { resetParams } from '../../redux/features/api/zwift_event_params/zwiftEventParamsSlice';
import useTitle from '../../hook/useTitle';
import JSONBlock from '../../components/JSONBlock/JSONBlock';
import FormRequest from '../../components/Zwift/UI/FormRequest/FormRequest';
import IconQuestion from '../../components/icons/IconQuestion';

import styles from './ZwiftViewEvent.module.css';

const descriptionForTitle =
  'Отображаются заезды из открытых клубов. Если клуб только по приглашению, то заезд не будет найден по его id.';

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
      return;
    }

    dispatch(fetchZwiftEventParams({ eventId }));
    dispatch(resetEventIdCreated());
  }, [eventId, dispatch]);

  // Сброс данных в хранилище при размонтировании компонента.
  useEffect(() => {
    return () => dispatch(resetParams());
  }, []);

  return (
    <section className={styles.block}>
      <div className={styles.header}>
        <h3 className={styles.title}>Данные заезда Звифте</h3>
        <IconQuestion squareSize={16} tooltip={descriptionForTitle} />
      </div>

      <div className={styles.group}>
        <FormRequest name={'Id изменяемого Event'} />
      </div>
      <JSONBlock
        json={eventParams?.eventMainParams?.id === 0 ? null : eventParams?.eventMainParams}
      />
    </section>
  );
}

export default ZwiftViewEvent;
