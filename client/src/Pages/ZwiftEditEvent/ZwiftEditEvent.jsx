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
import { fetchZwiftEventParams } from '../../redux/features/api/zwift_event_params/fetchZwiftEventParams';
import {
  resetParams,
  setCategoryEnforcement,
  setPattern,
} from '../../redux/features/api/zwift_event_params/zwiftEventParamsSlice';
// import FormPattern from '../../components/Zwift/UI/FormEditEvent/FormPattern';
import {
  resetEventIdCreated,
  setEventId,
} from '../../redux/features/api/event-create/eventCreateSlice';

import styles from './ZwiftEditEvent.module.css';
import { prepareData } from './utils/preparation';

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

  useEffect(() => {
    if (id) {
      dispatch(setEventId(id));
    }

    return () => {
      dispatch(resetParams());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (eventId === 0) {
      return;
    }

    dispatch(fetchZwiftEventParams({ eventId }));
    dispatch(resetEventIdCreated());
  }, [eventId, dispatch]);

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
      if (pattern === '' || pattern === 'Сброс настроек') {
        return;
      }
      dispatch(
        getAlert({
          message: `Установлен пакет настроек "${pattern}"`,
          type: 'success',
          isOpened: true,
        })
      );
    } catch (error) {
      dispatch(getAlert({ message: error.message, type: 'error', isOpened: true }));
    }
  };

  const selectCategoryEnforcement = (categoryEnforcementName) => {
    dispatch(setCategoryEnforcement(categoryEnforcementName));
  };

  return (
    <section className={styles.block}>
      <h3 className={styles.title}>{'Изменение данных создаваемого заезда в Звифте'}</h3>
      <div className={styles.group}>
        <FormRequest name={'Id изменяемого Event'} />
      </div>
      {eventParams?.eventMainParams.worldId ? (
        <>
          {/* Выбор сохраненных настроек для Эвентов */}
          {/* <div className={styles.group}>
            <FormPattern activatePattern={activatePattern} />
          </div> */}

          {/* Форма для установки настроек Эвента */}
          <div className={styles.group}>
            <FormEditEvent selectCategoryEnforcement={selectCategoryEnforcement} />
          </div>

          {/* Формы для установки настроек в группах Эвента */}
          <FormEditEventGroup sendForm={sendNewEventParams} />

          <Button getClick={goBack}>назад</Button>
        </>
      ) : undefined}
      <JSONBlock
        json={eventParams?.eventMainParams?.id === 0 ? null : eventParams?.eventMainParams}
      />
    </section>
  );
}

export default ZwiftEditEvent;
