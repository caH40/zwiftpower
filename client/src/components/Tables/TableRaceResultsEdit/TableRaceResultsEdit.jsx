import { useState } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames/bind';

import { fetchResultEdit } from '../../../redux/features/api/result_edit/fetchResultEdit';
import useLeader from '../../../hook/useLeaders';
import { tdHeartRate, tdHeight, tdTime, tdWatts, tdWeight } from '../utils/td';
import TdCpWatts from '../Td/TdCpWatts';
import { getAgeCategory } from '../../../utils/event';
import CategoryBox from '../../CategoryBox/CategoryBox';
import TdRider from '../Td/TdRider';
import TdGap from '../Td/TdGap';
import TdWattsPerKg from '../Td/TdWattsPerKg';
import TdRank from '../Td/TdRank';
import TdDifferent from '../Td/TdDifferent';
import Checkbox from '../../UI/Checkbox/Checkbox';

import styles from '../Table.module.css';

import Thead from './Thead';
import { getCaption } from './utils';

const cx = classnames.bind(styles);

function TableRaceResultsEdit({ results, event }) {
  console.log(results);
  const columnsCP = useSelector((state) => state.columnsCP.value);
  const { zwiftId } = useSelector((state) => state.checkAuth.value.user);

  const [getLeaders, getSweepers] = useLeader(event);

  return (
    <table className={cx('table')}>
      <caption className={cx('caption', 'hidden')}>{getCaption(event)}</caption>
      <Thead columnsCP={columnsCP} />

      <tbody>
        {results?.map((result) => {
          const profile = result.profileData;
          const dsq = result.disqualification;

          return (
            <tr
              className={cx('hover', { current: zwiftId === result.profileId })}
              key={result._id}
            >
              <td className={styles.center}>
                <TdRank value={result.rankEvent} dsq={dsq} />
              </td>
              <td>
                <Checkbox
                  state={result.isDisqualification}
                  property={'disqualification'}
                  resultId={result._id}
                  tooltip={'Дисквалификация райдера'}
                  apiRequest={fetchResultEdit}
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

export default TableRaceResultsEdit;
