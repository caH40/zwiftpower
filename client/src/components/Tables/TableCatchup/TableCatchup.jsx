import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';

import { useSelector } from 'react-redux';

import styles from '../Table.module.css';

import { secondesToTime } from '../../../utils/date-convert';
import { getTimerLocal } from '../../../utils/date-local';
import CategoryBox from '../../CategoryBox/CategoryBox';
import TdRider from '../Td/TdRider';
import GapStart from '../../GapStart/GapStart';
import TdDistance from '../Td/TdDistance';
import TdElevation from '../Td/TdElevation';
import TdSpeed from '../Td/TdSpeed';

import { changeLabelCategoryInGaps } from '../../../utils/category';
import { getLaps, map, routeName } from '../../../utils/event';

import Thead from './Thead';

const cx = classnames.bind(styles);

function TableCatchup({ catchups }) {
  const { role } = useSelector((state) => state.checkAuth.value.user);

  const isModerator = ['admin', 'moderator'].includes(role);

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
              <td>{map(eventSubgroup.mapId)}</td>
              <td className={styles.td__nowrap}>{routeName(eventSubgroup.routeId)}</td>
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
