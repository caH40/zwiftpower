import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import FormEditEvent from '../../components/Zwift/UI/FormEditEvent/FormEditEvent';
import FormEditEventGroup from '../../components/Zwift/UI/FormEditEventGroup/FormEditEventGroup';
import useTitle from '../../hook/useTitle';
import { fetchEventCreatePost } from '../../redux/features/api/event-create/fetchEventCreatePost';
import { resetNavigateEventCreate } from '../../redux/features/api/event-create/eventCreateSlice';
import { resetParams } from '../../redux/features/api/zwift_event_params/zwiftEventParamsSlice';

import styles from './ZwiftCreateEvent.module.css';
import { prepareData } from './utils/preparation';

function ZwiftCreateEvent() {
  useTitle('Создание заезда в Zwift');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { needNavigate, eventId } = useSelector((state) => state.fetchEventCreate);
  const eventParams = useSelector((state) => state.eventParams);

  // needNavigate значение меняется на true, когда приходит положительны ответ
  // от сервера о создании Эвента в Звифте и добавлении его в БД zwiftpower.ru
  useEffect(() => {
    if (!needNavigate) {
      return;
    }
    navigate(`/zwift/event/edit/${eventId}`);
  }, [needNavigate]);

  const sendCreateNewEvent = () => {
    const event = prepareData(eventParams);
    dispatch(fetchEventCreatePost(event));
    dispatch(resetNavigateEventCreate());
    dispatch(resetParams());
  };

  return (
    <section className={styles.block}>
      <h2 className={styles.title}>
        Создание заезда в Zwift происходит в 2 этапа:
        <br />
        1. Создается заезд с минимально необходимыми настройками.
        <br />
        2. Детальная настройка заезда.
      </h2>
      <div className={styles.group}>
        <div className={styles.group}>
          <FormEditEvent isCreating={true} />
        </div>
        <FormEditEventGroup sendForm={sendCreateNewEvent} />
      </div>
    </section>
  );
}

export default ZwiftCreateEvent;
