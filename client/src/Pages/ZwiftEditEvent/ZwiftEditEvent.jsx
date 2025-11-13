import { useEffect } from 'react';
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
import { fetchZwiftEventParamsForModerator } from '../../redux/features/api/zwift_event_params/fetchZwiftEventParams';
import {
  resetParams,
  setCategoryEnforcement,
} from '../../redux/features/api/zwift_event_params/zwiftEventParamsSlice';
import { useConfigsFPOptions } from '../../hook/useConfigsFPOptions';
import {
  resetEventIdCreated,
  setEventId,
} from '../../redux/features/api/event-create/eventCreateSlice';
import IconQuestion from '../../components/icons/IconQuestion';

import styles from './ZwiftEditEvent.module.css';
import { prepareData } from './utils/preparation';

const descriptionForTitle =
  'Редактируются заезды которые есть в БД сайта и в которых вы являетесь модератором, назначенным на сайте zwiftpower.ru. В других случаях заезд не будет найден по его id или будет предупреждение об отсутствии прав доступа.';

/**
 * Страница "Редактирования заезда". Изменение параметров Эвента, подгрупп, выбор пакета настроек
 * с последующим сохранением на сервере в Zwift
 */
function ZwiftEditEvent() {
  const { id } = useParams();
  const { eventId } = useSelector((state) => state.fetchEventCreate);

  useTitle('Редактирование заезда в Zwift');
  const eventParams = useSelector((state) => state.eventParams);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  // Получение массива options для select выбора конфигурации финишного протокола.
  const configsFinishProtocol = useConfigsFPOptions(eventParams?.eventMainParams?.organizerId);

  useEffect(() => {
    if (id) {
      dispatch(setEventId({ eventId: id }));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (eventId === 0) {
      return;
    }

    dispatch(fetchZwiftEventParamsForModerator({ eventId }));
    dispatch(resetEventIdCreated());
  }, [eventId, dispatch]);

  // Сброс данных в хранилище при размонтировании компонента.
  useEffect(() => {
    return () => dispatch(resetParams());
  }, [dispatch]);

  const sendNewEventParams = () => {
    const eventForPost = prepareData(eventParams);

    changeZwiftEvents(eventForPost)
      .then((data) => {
        dispatch(getAlert({ message: data.data?.message, type: 'success', isOpened: true }));
        dispatch(resetParams());
      })
      .catch((error) => {
        dispatch(
          getAlert({
            message: error.response ? error.response.data.message : 'Непредвиденная ошибка',
            type: 'error',
            isOpened: true,
          })
        );
      });
    return false;
  };

  const selectCategoryEnforcement = (categoryEnforcementName) => {
    dispatch(setCategoryEnforcement(categoryEnforcementName));
  };

  return (
    <section className={styles.block}>
      <div className={styles.header}>
        <h3 className={styles.title}>Изменение данных создаваемого заезда в Звифте</h3>
        <IconQuestion squareSize={16} tooltip={descriptionForTitle} />
      </div>

      <div className={styles.group}>
        <FormRequest name={'Id изменяемого Event'} />
      </div>
      {eventParams?.eventMainParams.worldId ? (
        <>
          {/* Форма для установки настроек Эвента */}
          <div className={styles.group}>
            <FormEditEvent
              selectCategoryEnforcement={selectCategoryEnforcement}
              configsFinishProtocol={configsFinishProtocol}
            />
          </div>

          {/* Формы для установки настроек в группах Эвента */}
          <FormEditEventGroup sendForm={sendNewEventParams} />

          <Button getClick={goBack}>назад</Button>
        </>
      ) : undefined}

      <div className={styles.spacer__json}>
        <JSONBlock
          json={eventParams?.eventMainParams?.id === 0 ? null : eventParams?.eventMainParams}
        />
      </div>
    </section>
  );
}

export default ZwiftEditEvent;
