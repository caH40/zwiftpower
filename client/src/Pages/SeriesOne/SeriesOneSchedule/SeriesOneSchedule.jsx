import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useTitle from '../../../hook/useTitle';
import CardRacePreview from '../../../components/CardRacePreview/CardRacePreview';
import { HelmetSeriesSchedule } from '../../../components/Helmets/HelmetSeriesSchedule';
import { getTimerLocal } from '../../../utils/date-local';

import styles from './SeriesOneSchedule.module.css';

/**
 * Страница с расписанием этапов Серии заездов.
 */
export default function SeriesOneSchedule() {
  const { seriesPublicOne, status: statusPublicOne } = useSelector(
    (state) => state.seriesPublic
  );
  const navigate = useNavigate();

  useTitle(seriesPublicOne?.name && `Этапы ${seriesPublicOne?.name}`);

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
          {!!seriesPublicOne?.stages?.length &&
            statusPublicOne === 'resolved' &&
            seriesPublicOne.stages.map((eventPreview) => {
              return (
                <CardRacePreview event={eventPreview} key={eventPreview.id} getClick={toLink} />
              );
            })}
        </div>
      </>
    )
  );
}
