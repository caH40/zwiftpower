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
  setCategoryEnforcement,
} from '../../redux/features/api/zwift_event_params/zwiftEventParamsSlice';
import {
  getInitialMainParams,
  initialSubgroup,
  initialRules,
} from '../../redux/features/api/zwift_event_params/initialState';
import { getAlert } from '../../redux/features/alertMessageSlice';
import { resetClub } from '../../redux/features/api/zwift_club/zwiftClubSlice';
import { fetchGetClubsForModeratorZwiftModerator } from '../../redux/features/api/organizer/fetchClubsModerator';

import styles from './ZwiftCreateEvent.module.css';
import { prepareData } from './utils/preparation';

function ZwiftCreateEvent() {
  useTitle('Создание заезда в Zwift');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const eventParams = useSelector((state) => state.eventParams);
  const { clubsForModerator } = useSelector((state) => state.clubsModerator);
  const userAuth = useSelector((state) => state.checkAuth.value.user);

  // Сброс хранилища при размонтировании компонента.
  useEffect(() => {
    return () => {
      dispatch(resetParams());
      dispatch(resetClub());
    };
  }, []);

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
  }, []);

  useEffect(() => {
    // установка начальных настроек Эвента при создании Эвента
    dispatch(fetchGetClubsForModeratorZwiftModerator({ moderatorId: userAuth.id }));
  }, []);

  const sendCreateNewEvent = () => {
    if (!eventParams.eventMainParams.microserviceExternalResourceId) {
      const message = 'Необходимо выбрать Клуб в котором создается Эвент!';
      dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return;
    }
    const event = prepareData(eventParams);
    dispatch(fetchEventCreatePost(event)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        navigate('/zwift/event/add');
      }
    });
  };

  const selectCategoryEnforcement = (categoryEnforcementName) => {
    dispatch(setCategoryEnforcement(categoryEnforcementName));
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
          <FormClub isCreating={true} clubs={clubsForModerator} />
        </div>
        <div className={styles.group}>
          <FormEditEvent
            isCreating={true}
            selectCategoryEnforcement={selectCategoryEnforcement}
          />
        </div>
        <FormEditEventGroup isCreating={true} sendForm={sendCreateNewEvent} />
      </div>
    </section>
  );
}

export default ZwiftCreateEvent;
