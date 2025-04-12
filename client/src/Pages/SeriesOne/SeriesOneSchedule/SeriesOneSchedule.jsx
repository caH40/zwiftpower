import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../../hook/useTitle';
import CardRacePreview from '../../../components/CardRacePreview/CardRacePreview';
import { HelmetSeriesSchedule } from '../../../components/Helmets/HelmetSeriesSchedule';
import { getTimerLocal } from '../../../utils/date-local';
import { fetchGetStages } from '../../../redux/features/api/series/fetchSeries';
import { resetStages } from '../../../redux/features/api/series/seriesPublicSlice';

import styles from './SeriesOneSchedule.module.css';

/**
 * Страница с расписанием этапов Серии заездов.
 */
export default function SeriesOneSchedule() {
  const { seriesPublicOne, stages } = useSelector((state) => state.seriesPublic);
  const { urlSlug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useTitle(seriesPublicOne?.name && `Этапы ${seriesPublicOne?.name}`);

  // Запрос данных по этапам в расписании (которые не стартовали);
  useEffect(() => {
    dispatch(fetchGetStages({ urlSlug, status: 'upcoming' }));

    return () => dispatch(resetStages());
  }, []);

  const toLink = (id) => navigate(`/race/schedule/${id}`);

  return (
    seriesPublicOne && (
      <>
        <HelmetSeriesSchedule
          urlSlug={seriesPublicOne.urlSlug}
          name={seriesPublicOne.name}
          imageSrc={seriesPublicOne.posterUrls?.medium}
          dateStart={getTimerLocal(seriesPublicOne.dateStart, 'DDMMYY')}
          dateEnd={getTimerLocal(seriesPublicOne.dateEnd, 'DDMMYY')}
          organizer={seriesPublicOne.organizer.name}
          description={seriesPublicOne.mission}
        />

        <div className={styles.wrapper}>
          {!!stages?.length &&
            stages.map((eventPreview) => {
              return (
                <CardRacePreview event={eventPreview} key={eventPreview.id} getClick={toLink} />
              );
            })}
        </div>
      </>
    )
  );
}
