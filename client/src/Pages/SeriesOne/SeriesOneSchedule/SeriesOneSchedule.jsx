import { useSelector } from 'react-redux';

import useTitle from '../../../hook/useTitle';
import CardRacePreview from '../../../components/CardRacePreview/CardRacePreview';

import styles from './SeriesOneSchedule.module.css';

/**
 * Страница с расписанием этапов Серии заездов.
 */
export default function SeriesOneSchedule() {
  const { seriesPublicOne, status: statusPublicOne } = useSelector(
    (state) => state.seriesPublic
  );

  useTitle(`Этапы ${seriesPublicOne?.name}` || 'Серия заездов');
  // console.log(seriesPublicOne?.stages);
  return (
    seriesPublicOne && (
      <div className={styles.wrapper}>
        {!!seriesPublicOne?.stages?.length &&
          statusPublicOne === 'resolved' &&
          seriesPublicOne.stages.map((eventPreview) => {
            return <CardRacePreview event={eventPreview} key={eventPreview.id} />;
          })}
      </div>
    )
  );
}
