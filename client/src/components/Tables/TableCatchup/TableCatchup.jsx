import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';

import { useSelector } from 'react-redux';

import styles from '../Table.module.css';

import { secondesToTime } from '../../../utils/date-convert';
import { getTimerLocal } from '../../../utils/date-local';
import CategoryBox from '../../CategoryBox/CategoryBox';
import TdRider from '../Td/TdRider';
import { getDistanceForTd, getElevationForTd, getLaps, map, route } from '../../../utils/event';

import Thead from './Thead';

const cx = classnames.bind(styles);

function TableCatchup({ catchups }) {
  const { role } = useSelector((state) => state.checkAuth.value.user);

  const isModerator = ['admin', 'moderator'].includes(role);

  return (
    <table className={cx('table', 'table_striped')}>
      <caption className={styles.caption}>Победители этапов</caption>
      <Thead isModerator={isModerator} />
      <tbody>
        {catchups.map((catchupResult) => (
          <tr className={styles.hover} key={catchupResult.eventId}>
            <td>{getTimerLocal(catchupResult.eventStart, 'DDMMYY')}</td>
            <td>
              <CategoryBox showLabel={true} label={catchupResult.subgroupLabel} circle={true} />
            </td>
            <TdRider profileId={catchupResult.profileId} profile={catchupResult.profileData} />
            <td>{secondesToTime(catchupResult.durationInMilliseconds)}</td>
            <td>{catchupResult.totalFinishedCount}</td>
            <td>{map(catchupResult.eventSubgroup.mapId)}</td>
            <td className={styles.td__nowrap}>{route(catchupResult.eventSubgroup.routeId)}</td>
            <td>{getLaps(catchupResult.eventSubgroup.laps)}</td>
            <td>{getDistanceForTd(catchupResult.eventSubgroup)}</td>
            <td>{getElevationForTd(catchupResult.eventSubgroup)}</td>
            <td>
              <Link className={styles.link} to={`/race/results/${catchupResult.eventId}`}>
                этап
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableCatchup;
