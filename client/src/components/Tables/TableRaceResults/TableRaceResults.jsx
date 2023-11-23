import { useState } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames/bind';

import useLeader from '../../../hook/useLeaders';
import { useSortResults } from '../../../hook/useSortResults';
import { tdHeartRate, tdHeight, tdTime, tdWatts, tdWeight } from '../utils/td';
import TdCpWatts from '../Td/TdCpWatts';
import { useResize } from '../../../hook/use-resize';
import CategoryBox from '../../CategoryBox/CategoryBox';
import TdRider from '../Td/TdRider';
import TdGap from '../Td/TdGap';
import TdWattsPerKg from '../Td/TdWattsPerKg';
import TdRank from '../Td/TdRank';
import TdDifferent from '../Td/TdDifferent';

import { getAgeCategory } from '../../../utils/age';

import styles from '../Table.module.css';

import Thead from './Thead';
import { getCaption } from './utils';

const cx = classnames.bind(styles);

function TableRaceResults({ results, event }) {
  // показывать сквозную нумерацию в таблице
  const [showIndex, setShowIndex] = useState(false);

  const columnsCP = useSelector((state) => state.columnsCP.value);
  const { zwiftId } = useSelector((state) => state.checkAuth.value.user);

  const { isScreenSm: sm, isScreenMd: md } = useResize();

  const [getLeaders, getSweepers] = useLeader(event);

  const resultSortedAndFiltered = useSortResults(results, setShowIndex);

  return (
    <table className={cx('table')}>
      <caption className={cx('caption', 'hidden')}>{getCaption(event)}</caption>
      <Thead md={md} sm={sm} columnsCP={columnsCP} showIndex={showIndex} />

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
                  isDsq={isDsq}
                  dsqType={dsqType}
                  dsqDescription={dsqDescription}
                />
              </td>

              <td>
                <CategoryBox showLabel={true} label={result.subgroupLabel} circle={true} />
              </td>

              <TdRider
                profile={profile}
                profileId={result.profileId}
                showIcons={{ sm }}
                getLeaders={getLeaders}
                getSweepers={getSweepers}
              />
              <td>{tdTime(result.activityData.durationInMilliseconds.addition)}</td>
              <TdGap gap={result.gap} dsq={isDsq} />
              <TdGap gap={result.gapPrev} dsq={isDsq} />

              <TdWattsPerKg
                valueRaw={result.wattsPerKg.value}
                valueAddition={result.wattsPerKg.addition}
              />

              <td>{tdWatts(result.sensorData.avgWatts.addition)}</td>

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
              {
                <>
                  <td>{tdHeartRate(result.sensorData.heartRateData.avgHeartRate.addition)}</td>
                  <td>{tdWeight(profile.weightInGrams.addition)}</td>
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
