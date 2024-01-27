import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import FormEditEvent from '../../components/Zwift/UI/FormEditEvent/FormEditEvent';
import FormEditEventGroup from '../../components/Zwift/UI/FormEditEventGroup/FormEditEventGroup';
import useTitle from '../../hook/useTitle';
import { fetchEventCreatePost } from '../../redux/features/api/event-create/fetchEventCreatePost';
import {
  resetParams,
  setMainParams,
  setSubgroupParams,
} from '../../redux/features/api/zwift_event_params/zwiftEventParamsSlice';
import {
  getInitialMainParams,
  getInitialSubgroup,
} from '../../redux/features/api/zwift_event_params/initialState';

import styles from './ZwiftCreateEvent.module.css';
import { prepareData } from './utils/preparation';

function ZwiftCreateEvent() {
  useTitle('Создание заезда в Zwift');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const eventParams = useSelector((state) => state.eventParams);

  useEffect(() => {
    dispatch(setMainParams(getInitialMainParams()));
    dispatch(setSubgroupParams(getInitialSubgroup()));

    return () => dispatch(dispatch(resetParams()));
  }, []);

  const sendCreateNewEvent = () => {
    const event = prepareData(eventParams);
    dispatch(fetchEventCreatePost(event));
    dispatch(resetParams());
    navigate('/zwift/event/add');
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
