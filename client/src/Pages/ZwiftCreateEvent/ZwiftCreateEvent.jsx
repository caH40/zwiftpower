import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import FormClub from '../../components/Zwift/UI/FormEditEvent/FormClub';
import FormEditEvent from '../../components/Zwift/UI/FormEditEvent/FormEditEvent';
import FormEditEventGroup from '../../components/Zwift/UI/FormEditEventGroup/FormEditEventGroup';
import useTitle from '../../hook/useTitle';
import { fetchEventCreatePost } from '../../redux/features/api/event-create/fetchEventCreatePost';
import {
  resetParams,
  setMainParams,
  setSubgroupParams,
  setInitialOtherParams,
} from '../../redux/features/api/zwift_event_params/zwiftEventParamsSlice';
import {
  getInitialMainParams,
  initialSubgroup,
  initialRules,
} from '../../redux/features/api/zwift_event_params/initialState';
import { getAlert } from '../../redux/features/alertMessageSlice';

import styles from './ZwiftCreateEvent.module.css';
import { prepareData } from './utils/preparation';

function ZwiftCreateEvent() {
  useTitle('Создание заезда в Zwift');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const eventParams = useSelector((state) => state.eventParams);

  useEffect(() => {
    // установка начальных настроек Эвента при создании Эвента
    dispatch(setMainParams(getInitialMainParams()));
    dispatch(setSubgroupParams(initialSubgroup));
    dispatch(
      setInitialOtherParams({
        rulesSet: initialRules,
        subgroups: [initialSubgroup],
      })
    );

    return () => dispatch(dispatch(resetParams()));
  }, []);

  const sendCreateNewEvent = () => {
    if (!eventParams.eventMainParams.microserviceExternalResourceId) {
      const message = 'Необходимо выбрать Клуб в котором создается Эвент!';
      dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return;
    }
    const event = prepareData(eventParams);
    dispatch(fetchEventCreatePost(event));
    dispatch(resetParams());
    navigate('/zwift/event/add');
  };

  return (
    <section className={styles.block}>
      <h2 className={styles.title}>Этапы создание Эвента (заезда) в Zwift:</h2>

      <ol className={styles.list}>
        <li className={styles.subtitle}>
          Создание Эвента с минимально необходимыми параметрами;
        </li>
        <li className={styles.subtitle}>Добавление Эвента на сайт zwiftpower.ru;</li>
        <li className={styles.subtitle}>Изменение необходимых параметров Эвента.</li>
      </ol>

      <div className={styles.group}>
        <div className={styles.group}>
          <FormClub isCreating={true} />
        </div>
        <div className={styles.group}>
          <FormEditEvent isCreating={true} />
        </div>
        <FormEditEventGroup isCreating={true} sendForm={sendCreateNewEvent} />
      </div>
    </section>
  );
}

export default ZwiftCreateEvent;
