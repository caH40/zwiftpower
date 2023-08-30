import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';
import FormRequest from '../../components/Zwift/UI/FormRequest/FormRequest';
import { getZwiftEvents, postEvent } from '../../api/zwift/events';
import { getAlert } from '../../redux/features/alertMessageSlice';
import DescriptionEventZwiftNew from '../../components/DescriptionEventZwiftNew/DescriptionEventZwiftNew';
import FormAdditionalParamsEvent from '../../components/UI/FormAdditionalParamsEvent/FormAdditionalParamsEvent';
import { getSeriesActual } from '../../api/zwift/series';

import styles from './ZwiftAddEvent.module.css';

function ZwiftAddEvent() {
  const [eventId, setEventId] = useState({ id: 0 });
  const [event, setEvent] = useState({});
  const [series, setSeries] = useState([{ id: 0, value: '', name: '' }]);
  const [additionalParams, setAdditionalParams] = useState({});

  useTitle('Zwift - Добавление заезда');
  useBackground(false);
  const dispatch = useDispatch();
  const { id: userId } = useSelector((state) => state.checkAuth.value.user);

  const fetchEventParams = () => {
    if (!eventId.id)
      return dispatch(
        getAlert({ message: 'Необходимо ввести Id заезда!', type: 'warning', isOpened: true })
      );
    getZwiftEvents(eventId.id)
      .then((response) => {
        setEvent(response.data);
        dispatch(getAlert({ message: 'Данные получены', type: 'success', isOpened: true }));
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

  useEffect(() => {
    getSeriesActual()
      .then((response) => {
        const seriesArray = response.data.series;
        const seriesForOptions = seriesArray.map((seriesOne, index) => ({
          id: index,
          value: seriesOne._id,
          name: seriesOne.name,
        }));
        const nullOptions = [{ id: 0, value: null, name: null }];
        setSeries(seriesArray.length ? seriesForOptions : nullOptions);
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
  }, [event, dispatch]);

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
    const eventForSend = { creator: userId, ...event, ...additionalParams };
    postEvent(eventForSend)
      .then((response) => {
        setEventId({ id: 0 });
        setEvent({});
        setAdditionalParams({});
        dispatch(
          getAlert({
            message: response.data.message,
            type: 'success',
            isOpened: true,
          })
        );
      })
      .catch((error) => {
        const message = error.response
          ? JSON.stringify(error.response.data.message || error.message)
          : 'Непредвиденная ошибка';
        dispatch(
          getAlert({
            message,
            type: 'error',
            isOpened: true,
          })
        );
      });
  };

  return (
    <section className={styles.block}>
      <h3 className={styles.title}>
        {'Добавление заезда из Звифта для отслеживания результатов'}
      </h3>
      <div className={styles.group}>
        <FormRequest
          name={'Id Event'}
          state={eventId}
          setState={setEventId}
          sendForm={fetchEventParams}
        />
      </div>
      {event.id && (
        <>
          <DescriptionEventZwiftNew event={event} />
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
