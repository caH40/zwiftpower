import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';
import { useSelector } from 'react-redux';

import { useRaceRoute } from '../../../hook/useRaceRoute';
import { secondesToTime } from '../../../utils/date-convert';
import { getTimerLocal } from '../../../utils/date-local';
import CategoryBox from '../../CategoryBox/CategoryBox';
import TdRider from '../Td/TdRider';
import GapStart from '../../GapStart/GapStart';
import TdDistance from '../Td/TdDistance';
import TdElevation from '../Td/TdElevation';
import TdSpeed from '../Td/TdSpeed';
import { changeLabelCategoryInGaps } from '../../../utils/category';
import { getLaps, getMapName } from '../../../utils/event';

import styles from '../Table.module.css';

import Thead from './Thead';

const cx = classnames.bind(styles);

function TableCatchup({ catchups }) {
  const { role } = useSelector((state) => state.checkAuth.value.user);

  const isModerator = ['admin', 'moderator'].includes(role);

  const routeIds = useMemo(() => {
    return [...new Set(catchups.map(({ eventSubgroup }) => eventSubgroup.routeId))];
  }, [catchups]);

  const routes = useRaceRoute(routeIds);

  return (
    <table className={cx('table')}>
      <caption className={styles.caption}>Победители этапов</caption>
      <Thead isModerator={isModerator} />
      <tbody>
        {catchups.map((catchupResult) => {
          const { eventSubgroup } = catchupResult;
          return (
            <tr className={styles.hover} key={catchupResult.eventId}>
              <td>{getTimerLocal(catchupResult.eventStart, 'DDMMYY')}</td>
              <td>
                <CategoryBox
                  showLabel={true}
                  label={
                    catchupResult.subgroupLabel === 'E' ? 'APlus' : catchupResult.subgroupLabel
                  }
                  circle={true}
                />
              </td>
              <TdRider
                profileId={catchupResult.profileId}
                profile={catchupResult.profileData}
              />
              <td>{secondesToTime(catchupResult.durationInMilliseconds)}</td>
              <TdSpeed speed={catchupResult.speed} />
              <td>{catchupResult.totalFinishedCount}</td>
              <td>
                <GapStart
                  gaps={changeLabelCategoryInGaps({
                    gaps: catchupResult.gaps,
                    oldLabel: 'E',
                    newLabel: 'APlus',
                  })}
                />
              </td>
              <td>{getMapName(eventSubgroup.mapId)}</td>
              <td className={styles.td__nowrap}>{routes[eventSubgroup.routeId]?.name}</td>
              <td>{getLaps(eventSubgroup.laps)}</td>
              {TdDistance(
                eventSubgroup.durationInSeconds,
                eventSubgroup.distanceInMeters,
                eventSubgroup.distanceSummary.distanceInKilometers
              )}
              {TdElevation(
                eventSubgroup.durationInSeconds,
                eventSubgroup.distanceInMeters,
                eventSubgroup.distanceSummary.elevationGainInMeters
              )}
              <td>
                <Link className={styles.link} to={`/race/results/${catchupResult.eventId}`}>
                  этап
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableCatchup;
