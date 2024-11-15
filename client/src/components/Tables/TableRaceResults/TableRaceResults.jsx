import { useState } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames/bind';

import { useShowIndex } from '../../../hook/useShowIndex';
import { useSortResults } from '../../../hook/useSortResults';
import { getAgeCategory } from '../../../utils/age';
import { tdHeartRate, tdHeight, tdTime, tdWatts } from '../utils/td';
import useLeader from '../../../hook/useLeaders';
import CategoryRSBox from '../../CategoryRSBox/CategoryRSBox';
import TdCpWatts from '../Td/TdCpWatts';
import CategoryBox from '../../CategoryBox/CategoryBox';
import TdRider from '../Td/TdRider';
import TdGap from '../Td/TdGap';
import TdWattsPerKg from '../Td/TdWattsPerKg';
import TdRank from '../Td/TdRank';
import TdDifferent from '../Td/TdDifferent';
import TdSpeed from '../Td/TdSpeed';
import NPandVIBox from '../../NPandVIBox/NPandVIBox';
import TdWeight from '../Td/TdWeight';

import styles from '../Table.module.css';

import Thead from './Thead';
import { getCaption } from './utils';

const cx = classnames.bind(styles);

function TableRaceResults({ results, event, forDNF }) {
  // показывать сквозную нумерацию в таблице
  const [showIndex, setShowIndex] = useState(false);

  // id ячеек столбца на который наведен курсор мышки.
  const [columnActive, setColumnActive] = useState(false);

  const columnsCP = useSelector((state) => state.columnsCP.value);
  const { zwiftId } = useSelector((state) => state.checkAuth.value.user);

  const [getLeaders, getSweepers] = useLeader(event);

  useShowIndex(setShowIndex, event.typeRaceCustom);
  const resultSortedAndFiltered = useSortResults(results, event.typeRaceCustom);

  return (
    <table className={cx('table')}>
      <caption className={cx('caption', 'hidden')}>{getCaption(event)}</caption>
      <Thead columnsCP={columnsCP} showIndex={showIndex} />

      <tbody>
        {resultSortedAndFiltered?.map((result, index) => {
          const profile = result.profileData;
          const isDsq = result.isDisqualification;
          const dsqType = result.disqualification;
          const dsqDescription = result.disqualificationDescription;

          return (
            <tr
              className={cx('hover', { current: zwiftId === result.profileId })}
              key={result._id}
            >
              {showIndex && <td className={cx('centerTd')}>{index + 1}</td>}

              <td className={styles.centerTd}>
                <TdRank
                  value={result.rankEvent}
                  isDsq={forDNF ? true : isDsq}
                  dsqType={forDNF ? 'DNF' : dsqType}
                  dsqDescription={dsqDescription}
                />
              </td>

              <td>
                <CategoryBox showLabel={true} label={result.subgroupLabel} circle={true} />
              </td>

              <TdRider
                profile={profile}
                profileId={result.profileId}
                getLeaders={getLeaders}
                getSweepers={getSweepers}
              />
              <td>{tdTime(result.activityData.durationInMilliseconds.addition)}</td>
              <TdGap gap={result.gap} dsq={isDsq} />
              <TdGap gap={result.gapPrev} dsq={isDsq} />
              <TdSpeed speed={result.speed} />

              <TdWattsPerKg valueAddition={result.wattsPerKg.addition} />

              <td>{tdWatts(result.sensorData.avgWatts.addition)}</td>
              <td>
                <NPandVIBox
                  variabilityIndex={result.variabilityIndex}
                  normalizedPower={result.normalizedPower}
                />
              </td>

              {columnsCP.map((column, indexColumnCP) => {
                const id = `TdCpWatts-${indexColumnCP}`;

                if (column.isVisible) {
                  return (
                    <TdCpWatts
                      cpBestEfforts={result.cpBestEfforts}
                      interval={column.interval}
                      key={column.id}
                      id={id}
                      onMouseEnter={() => setColumnActive(id)}
                      onMouseLeave={() => setColumnActive(null)}
                      hoverEnabled={columnActive === id}
                    />
                  );
                }
                return null;
              })}

              <td>
                <CategoryRSBox
                  racingScore={result.profileData.racingScore || 0}
                  zwiftId={result.profileId}
                />
              </td>

              {
                <>
                  <td>{tdHeartRate(result.sensorData.heartRateData.avgHeartRate.addition)}</td>
                  <TdWeight
                    weight={profile.weightInGrams.addition}
                    zwiftId={result.profileId}
                  />
                  <td>{tdHeight(profile.heightInCentimeters.addition)}</td>
                  <td>{getAgeCategory(profile.age)}</td>
                  <TdDifferent
                    isPairedSteeringDevice={result.sensorData.pairedSteeringDevice}
                  />
                </>
              }
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableRaceResults;
