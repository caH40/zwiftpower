import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useTitle from '../../hook/useTitle';
import FormRequest from '../../components/Zwift/UI/FormRequest/FormRequest';
import DescriptionEventZwift from '../../components/DescriptionEventZwift/DescriptionEventZwift';
import FormAdditionalParamsEvent from '../../components/UI/FormAdditionalParamsEvent/FormAdditionalParamsEvent';
import { fetchZwiftEventParams } from '../../redux/features/api/zwift_event_params/fetchZwiftEventParams';
import { resetParams } from '../../redux/features/api/zwift_event_params/zwiftEventParamsSlice';
import { fetchActualSeries } from '../../redux/features/api/series-actual/fetchActualSeries';
import { getAlert } from '../../redux/features/alertMessageSlice';
import { resetSeries } from '../../redux/features/api/series-actual/actualSeriesSlice';
import { fetchEventPost } from '../../redux/features/api/event-add/fetchEventPost';
import { resetEventIdCreated } from '../../redux/features/api/event-create/eventCreateSlice';
import {
  accessExpressions,
  accessExpressionsDisabled,
} from '../../assets/zwift/accessExpression';
import { fetchGetOrganizersForModerator } from '../../redux/features/api/organizer/fetchOrganizerModerator';
import SimpleSelectFunction from '../../components/UI/SimpleSelect/SimpleSelectFunction';
import {
  reducerSelectOrganizersForModerator,
  resetOrganizerDataModerator,
  setOrganizersForModerator,
} from '../../redux/features/api/organizer/organizerModeratorSlice';
import IconQuestion from '../../components/icons/IconQuestion';
import { useConfigsFPOptions } from '../../hook/useConfigsFPOptions';

import styles from './ZwiftAddEvent.module.css';

const descriptionForTitle =
  'Добавляются только заезды из клуба, в котором вы являетесь модератором, назначенным на сайте zwiftpower.ru.';

function ZwiftAddEvent() {
  const { eventId, organizerId } = useSelector((state) => state.fetchEventCreate);

  useTitle('Добавление заезда из Zwift');
  const { eventMainParams } = useSelector((state) => state.eventParams);
  const [additionalParams, setAdditionalParams] = useState({ seriesId: null });

  const { id: userId } = useSelector((state) => state.checkAuth.value.user);
  const { organizersForModerator, organizerForModerator } = useSelector(
    (state) => state.organizerModerator
  );
  const { series } = useSelector((state) => state.fetchActualSeries);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Получение массива options для select выбора конфигурации финишного протокола.
  const configsFinishProtocol = useConfigsFPOptions(organizerId);

  useEffect(() => {
    dispatch(fetchGetOrganizersForModerator({ userId }));

    // Сброс данных после размонтирования компонента.
    return () => {
      dispatch(resetOrganizerDataModerator());
      dispatch(resetSeries());
      dispatch(resetParams());
    };
  }, [dispatch, userId]);

  // запрос параметров Эвента
  useEffect(() => {
    if (eventId === 0 || organizerId === 0) {
      return;
    }

    dispatch(setOrganizersForModerator(organizerId));
    dispatch(fetchZwiftEventParams({ eventId, organizerId }));
    dispatch(resetEventIdCreated());
  }, [eventId, organizerId, dispatch]);

  // запрос актуальных серий
  useEffect(() => {
    if (!eventMainParams?.name) {
      return;
    }

    dispatch(fetchActualSeries({ organizerId }));
  }, [eventMainParams, dispatch, organizerId]);

  // добавление Эвента в БД
  const addEvent = () => {
    // Добавление названия пакета настроек строгой категоризации.
    // Если добавляется сразу после создания, то accessExpression:null, либо регистрация временно закрыта.
    // Если добавляется в БД уже созданный заезд, то для правильного описания строгой категоризации
    // необходимо заново установить строгую категоризацию в настройках эвента.
    const accessExpressionObj =
      accessExpressions.find((elm) => elm.value === eventMainParams?.accessExpression) ||
      accessExpressionsDisabled;

    // Удаления value,paceValues строки, так как она уже есть в сущности ZwiftEvent в которую вносятся данные изменения.
    const accessExpressionObjFiltered = {
      description: accessExpressionObj.description,
      id: accessExpressionObj.id,
      label: accessExpressionObj.label,
      name: accessExpressionObj.name,
    };

    // Добавление типа Гонки на основании чего будет рассчитываться финишный протокол.
    const isFilledFields = additionalParams.typeRaceCustom;
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

    const eventForSend = {
      creator: userId,
      ...eventMainParams,
      ...additionalParams,
      accessExpressionObj: accessExpressionObjFiltered,
      seriesId: additionalParams.seriesId,
    };

    dispatch(fetchEventPost(eventForSend)).then((data) => {
      if (data.meta.requestStatus === 'fulfilled') {
        navigate('/race/schedule');
      }
    });
    setAdditionalParams({});
  };

  // Обработчик выбора селекта для выбора Организатора в один из клуба которого будет добавляться Эвент.
  const handlerSelectOrganizersForModerator = (value) => {
    dispatch(reducerSelectOrganizersForModerator(value));
  };

  return (
    <section className={styles.block}>
      {/* Если получены данные добавляемого Эвента eventMainParams, то отображается форма добавления  */}
      {eventMainParams?.name ? (
        <>
          <DescriptionEventZwift event={eventMainParams} forSchedule={true} />

          <FormAdditionalParamsEvent
            form={additionalParams}
            setForm={setAdditionalParams}
            series={series}
            sendForm={addEvent}
            configsFinishProtocol={configsFinishProtocol}
          />
        </>
      ) : (
        <>
          {/* Если не получены данные добавляемого Эвента,то отображается форма поиска Эвента для добавления */}
          {!!organizersForModerator.length && (
            <>
              <div className={styles.header}>
                <h3 className={styles.title}>
                  Выбор Организатора в клуб которого добавляется Эвент
                </h3>
                <IconQuestion squareSize={16} tooltip={descriptionForTitle} />
              </div>

              <div className={styles.group}>
                <SimpleSelectFunction
                  value={organizerForModerator}
                  reducer={handlerSelectOrganizersForModerator}
                  options={organizersForModerator.map((elm) => ({
                    name: elm._id,
                    label: elm.name,
                    id: elm._id,
                  }))}
                />
              </div>
            </>
          )}

          <h3 className={styles.title}>
            Добавление заезда из Звифта для отслеживания результатов
          </h3>

          <div className={styles.group}>
            <FormRequest
              name={'Id Event'}
              organizerId={organizerForModerator}
              disabled={organizerForModerator === 0}
            />
          </div>
        </>
      )}
    </section>
  );
}

export default ZwiftAddEvent;
