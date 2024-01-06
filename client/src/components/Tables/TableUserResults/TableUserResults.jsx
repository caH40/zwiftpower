import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';

import NPandVIBox from '../../NPandVIBox/NPandVIBox';
import { tdHeartRate, tdTime, tdWatts, tdWeight } from '../utils/td';
import TdCpWatts from '../Td/TdCpWatts';
import TdWattsPerKg from '../Td/TdWattsPerKg';
import CategoryBox from '../../CategoryBox/CategoryBox';
import { getTimerLocal } from '../../../utils/date-local';
import TdRank from '../Td/TdRank';
import TdSpeed from '../Td/TdSpeed';

import styles from '../Table.module.css';

import Thead from './Thead';
import { getCaption } from './utils';

const cx = classnames.bind(styles);

function TableUserResults({ results }) {
  const columnsCP = useSelector((state) => state.columnsCP.value);

  return (
    <table className={styles.table}>
      <caption className={cx('caption', 'hidden')}>{getCaption(results[0])}</caption>
      <Thead columnsCP={columnsCP} />
      <tbody>
        {results?.map((result) => {
          const isDsq = result.isDisqualification;
          const dsqType = result.disqualification;
          const dsqDescription = result.disqualificationDescription;
          return (
            <tr className={styles.hover} key={result._id}>
              <td className={styles.centerTd}>
                <TdRank
                  value={result.rankEvent}
                  isDsq={isDsq}
                  dsqType={dsqType}
                  dsqDescription={dsqDescription}
                />
              </td>

              <td>
                <CategoryBox showLabel={true} label={result.subgroupLabel} circle={true} />
              </td>

              <td>{getTimerLocal(result.eventStart, 'DDMMYY')}</td>
              <td>
                <Link className={cx('link', 'name')} to={`/race/results/${result.eventId}`}>
                  <span className={styles.big}>{result.eventName}</span>
                </Link>
              </td>
              <td>{tdTime(result.activityData.durationInMilliseconds.addition)}</td>
              <TdSpeed speed={result.speed} />
              <TdWattsPerKg
                valueRaw={result.wattsPerKg.value}
                valueAddition={result.wattsPerKg.addition}
              />

              <td>{tdWatts(result.sensorData.avgWatts.addition)}</td>
              <td>
                <NPandVIBox
                  variabilityIndex={result.variabilityIndex}
                  normalizedPower={result.normalizedPower}
                />
              </td>

              {columnsCP.map((column) => {
                if (column.isVisible) {
                  return (
                    <TdCpWatts
                      cpBestEfforts={result.cpBestEfforts}
                      interval={column.interval}
                      key={column.id}
                    />
                  );
                }
                return null;
              })}
              <td>{tdHeartRate(result.sensorData.heartRateData.avgHeartRate.addition)}</td>
              <td>{tdWeight(result.profileData.weightInGrams.addition)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableUserResults;
