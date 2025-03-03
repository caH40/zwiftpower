import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  fetchEventsForSeries,
  resetEventsForSeries,
} from '../../../../redux/features/api/eventsSlice';
import FormOrganizerSeriesCreate from '../../../../components/UI/FormOrganizerSeriesCreate/FormOrganizerSeriesCreate';
import { fetchGetOneSeriesOrganizer } from '../../../../redux/features/api/series/fetchSeries';
import MenuOrganizerSeries from '../../../../components/UI/Filters/MenuOrganizerSeries/MenuOrganizerSeries';
import { resetCurrentMenuItem } from '../../../../redux/features/menuOrganizerSeriesSlice';
import StagesSeriesEdit from '../../../../components/StagesSeriesEdit/StagesSeriesEdit';

import styles from './OrganizerSeriesCurrentEdit.module.css';

/**
 * Страница редактирования Серии заездов.
 */
export default function OrganizerSeriesCurrentEdit() {
  const { name } = useSelector((state) => state.menuOrganizerSeries.value);
  const { seriesId } = useParams();
  const [trigger, setTrigger] = useState(false);
  // Данные редактируемой серии.
  const { seriesOne } = useSelector((state) => state.seriesOrganizer);

  // Эвенты, которые можно добавить в Серю как этапы.
  const { eventsForSeries } = useSelector((state) => state.fetchEvents);

  const dispatch = useDispatch();

  // Запрос на получение Эвентов Организатора.
  useEffect(() => {
    dispatch(fetchEventsForSeries());
    dispatch(fetchGetOneSeriesOrganizer({ seriesId }));

    return () => {
      dispatch(resetEventsForSeries());
      dispatch(resetCurrentMenuItem());
    };
  }, [dispatch, seriesId, trigger]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.spacer__menu}>
        <MenuOrganizerSeries />
      </div>

      {name === 'Главная' ? (
        seriesOne?._id && (
          <FormOrganizerSeriesCreate
            isCreating={false}
            seriesOne={seriesOne}
            // loading={statusFetchEvents === 'loading'}
            setTrigger={setTrigger}
          />
        )
      ) : (
        <StagesSeriesEdit />
      )}
    </section>
  );
}
