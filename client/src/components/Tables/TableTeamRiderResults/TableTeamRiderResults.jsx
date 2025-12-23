import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';

import { getTimerLocal } from '../../../utils/date-local';
import { tdHeartRate, tdTime, tdWatts } from '../utils/td';
import NPandVIBox from '../../NPandVIBox/NPandVIBox';
import TdWattsPerKg from '../Td/TdWattsPerKg';
import CategoryBox from '../../CategoryBox/CategoryBox';
import TdRider from '../Td/TdRider';
import TdRank from '../Td/TdRank';
import TdSpeed from '../Td/TdSpeed';
import TdWeight from '../Td/TdWeight';

import styles from '../Table.module.css';

import { getCaption } from './utils';
import Thead from './Thead';

const cx = classnames.bind(styles);

/**
 * Таблица результатов райдера
 * @param {object} props Пропсы.
 * @param {any[]} props.results Результаты.
 * @returns
 */
export default function TableTeamRiderResults({ results }) {
  return (
    <table className={styles.table}>
      <caption className={cx('caption', 'hidden')}>{getCaption(results[0])}</caption>
      <Thead />
      <tbody>
        {results?.map((result) => {
          const isDsq = result.isDisqualification;
          const dsqType = result.disqualification;
          const dsqDescription = result.disqualificationDescription;
          return (
            <tr className={styles.hover} key={result._id}>
              <td>{getTimerLocal(result.eventStart, 'DDMMYY')}</td>

              <td className={styles.centerTd}>
                <TdRank
                  value={result.rankEvent}
                  isDsq={isDsq}
                  dsqType={dsqType}
                  dsqDescription={dsqDescription}
                />
              </td>

              <td className={styles.centerTd}>{result.points?.zpruFinishPoints || null}</td>

              <td>
                <CategoryBox showLabel={true} label={result.subgroupLabel} circle={true} />
              </td>

              <TdRider profile={result.profileData} profileId={result.profileId} />

              <td>
                <Link className={cx('link', 'name')} to={`/race/results/${result.eventId}`}>
                  <span className={styles.big}>{result.eventName}</span>
                </Link>
              </td>
              <td>{tdTime(result.activityData.durationInMilliseconds.addition)}</td>
              <TdSpeed speed={result.speed} />
              <TdWattsPerKg valueAddition={result.wattsPerKg.addition} />

              <td>{tdWatts(result.sensorData.avgWatts.addition)}</td>
              <td>
                <NPandVIBox
                  variabilityIndex={result.variabilityIndex}
                  normalizedPower={result.normalizedPower}
                />
              </td>

              <td>{tdHeartRate(result.sensorData.heartRateData.avgHeartRate.addition)}</td>
              <TdWeight weight={result.profileData.weightInGrams.addition} />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
