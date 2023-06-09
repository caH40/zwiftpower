import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import useLeader from '../../../hook/useLeaders';
import { tdHeartRate, tdHeight, tdRank, tdTime, tdWatts, tdWeight } from '../utils/td';
import TdCpWatts from '../Td/TdCpWatts';
import { getAgeCategory } from '../../../utils/event';
import { useResize } from '../../../hook/use-resize';
import CategoryBox from '../../CategoryBox/CategoryBox';
import TdRider from '../Td/TdRider';
import TdGap from '../Td/TdGap';
import TdWattsPerKg from '../Td/TdWattsPerKg';

import styles from '../Table.module.css';

import Thead from './Thead';

function TableRaceResults({ results, event }) {
  const filterCategory = useSelector((state) => state.filterCategory.value);
  const columnsCP = useSelector((state) => state.columnsCP.value);
  const { isScreenLg: lg, isScreenSm: sm } = useResize();
  const [getLeaders, getSweepers] = useLeader(event);

  const resultFiltered = useMemo(() => {
    if (filterCategory.name === 'All') return results;
    return [...results].filter((result) => result.subgroupLabel === filterCategory.name);
  }, [filterCategory, results]);

  return (
    <table className={`${styles.table} ${styles.table_striped}`}>
      <Thead lg={lg} sm={sm} columnsCP={columnsCP} />
      <tbody>
        {resultFiltered?.map((result) => {
          const profile = result.profileData;

          return (
            <tr key={result._id}>
              <td className={styles.center}>{tdRank(result.rankEvent)}</td>
              {sm && (
                <td>
                  <CategoryBox showLabel={true} label={result.subgroupLabel} circle={true} />
                </td>
              )}
              <TdRider
                profile={profile}
                profileId={result.profileId}
                showIcons={{ sm }}
                getLeaders={getLeaders}
                getSweepers={getSweepers}
              />
              <td>{tdTime(result.activityData.durationInMilliseconds.addition)}</td>
              {lg && <TdGap gap={result.gap} />}
              {lg && <TdGap gap={result.gapPrev} />}
              {sm && (
                <TdWattsPerKg
                  valueRaw={result.wattsPerKg.value}
                  valueAddition={result.wattsPerKg.addition}
                />
              )}
              {sm && <td>{tdWatts(result.sensorData.avgWatts.addition)}</td>}

              {lg &&
                columnsCP.map((column) => {
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
              {lg && (
                <>
                  <td>{tdHeartRate(result.sensorData.heartRateData.avgHeartRate.addition)}</td>
                  <td>{tdWeight(profile.weightInGrams.addition)}</td>
                  <td>{tdHeight(profile.heightInCentimeters.addition)}</td>
                  <td>{getAgeCategory(profile.age)}</td>
                </>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableRaceResults;
