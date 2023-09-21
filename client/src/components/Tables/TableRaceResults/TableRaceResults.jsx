import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

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

import styles from '../Table.module.css';

import Thead from './Thead';

function TableRaceResults({ results, event }) {
  const filterCategory = useSelector((state) => state.filterCategory.value);
  const columnsCP = useSelector((state) => state.columnsCP.value);
  const { zwiftId } = useSelector((state) => state.checkAuth.value.user);

  const { isScreenSm: sm, isScreenMd: md } = useResize();

  const [getLeaders, getSweepers] = useLeader(event);

  const resultFiltered = useMemo(() => {
    if (filterCategory.name === 'All') return results;
    return [...results].filter((result) => result.subgroupLabel === filterCategory.name);
  }, [filterCategory, results]);

  return (
    <table className={cn(styles.table, styles.table_striped)}>
      <Thead md={md} sm={sm} columnsCP={columnsCP} />

      <tbody>
        {resultFiltered?.map((result) => {
          const profile = result.profileData;
          const dsq = result.disqualification;

          return (
            <tr
              className={cn({ [styles.current]: zwiftId === result.profileId })}
              key={result._id}
            >
              <td className={styles.center}>
                <TdRank value={result.rankEvent} dsq={dsq} />
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
              <TdGap gap={result.gap} dsq={dsq} />
              <TdGap gap={result.gapPrev} dsq={dsq} />

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
