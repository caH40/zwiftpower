import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames/bind';

import useLeader from '../../../hook/useLeaders';
import { tdHeartRate, tdHeight, tdTime, tdWatts, tdWeight } from '../utils/td';
import TdCpWatts from '../Td/TdCpWatts';
import { getAgeCategory } from '../../../utils/event';
import { useResize } from '../../../hook/use-resize';
import CategoryBox from '../../CategoryBox/CategoryBox';
import TdRider from '../Td/TdRider';
import TdGap from '../Td/TdGap';
import TdWattsPerKg from '../Td/TdWattsPerKg';
import TdRank from '../Td/TdRank';
import TdDifferent from '../Td/TdDifferent';
import { sortTable } from '../../../utils/table-sort';

import styles from '../Table.module.css';

import Thead from './Thead';
import { getCaption } from './utils';

const cx = classnames.bind(styles);

function TableRaceResults({ results, event }) {
  const filterCategory = useSelector((state) => state.filterCategory.value);
  const filterWatts = useSelector((state) => state.filterWatts.value);
  const activeSorting = useSelector((state) => state.sortTable.activeSorting);
  const columnsCP = useSelector((state) => state.columnsCP.value);
  const { zwiftId } = useSelector((state) => state.checkAuth.value.user);

  const { isScreenSm: sm, isScreenMd: md } = useResize();

  const [getLeaders, getSweepers] = useLeader(event);

  const resultSortedAndFiltered = useMemo(() => {
    let filteredResults = [];
    if (filterCategory.name === 'All') {
      filteredResults = results;
    } else {
      filteredResults = [...results].filter(
        (result) => result.subgroupLabel === filterCategory.name
      );
    }
    const sortedAndFilteredResults = sortTable(filteredResults, activeSorting, filterWatts);

    return sortedAndFilteredResults;
  }, [filterCategory, filterWatts, activeSorting, results]);

  return (
    <table className={cx('table')}>
      <caption className={cx('caption', 'hidden')}>{getCaption(event)}</caption>
      <Thead md={md} sm={sm} columnsCP={columnsCP} />

      <tbody>
        {resultSortedAndFiltered?.map((result) => {
          const profile = result.profileData;
          const isDsq = result.isDisqualification;
          const dsqType = result.disqualification;
          const dsqDescription = result.disqualificationDescription;

          return (
            <tr
              className={cx('hover', { current: zwiftId === result.profileId })}
              key={result._id}
            >
              <td className={styles.center}>
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
