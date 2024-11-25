import { useSelector } from 'react-redux';
import classnames from 'classnames/bind';

import { fetchResultEdit } from '../../../redux/features/api/result_edit/fetchResultEdit';
import useLeader from '../../../hook/useLeaders';
import { tdHeartRate, tdHeight, tdTime, tdWatts } from '../utils/td';
import TdCpWatts from '../Td/TdCpWatts';
import { getAgeCategory } from '../../../utils/age';
import CategoryBox from '../../CategoryBox/CategoryBox';
import TdRider from '../Td/TdRider';
import TdGap from '../Td/TdGap';
import TdWattsPerKg from '../Td/TdWattsPerKg';
import TdRank from '../Td/TdRank';
import TdDifferent from '../Td/TdDifferent';
import TdWeight from '../Td/TdWeight';
import CheckboxU from '../../UI/Checkbox/CheckboxU';
import styles from '../Table.module.css';

import Thead from './Thead';
import { getCaption } from './utils';

const cx = classnames.bind(styles);

function TableRaceResultsEdit({ results, event, handlerCheckboxDSQ }) {
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
          const isDsq = result.isDisqualification;
          const dsqType = result.disqualification;
          const dsqDescription = result.disqualificationDescription;

          return (
            <tr
              className={cx('hover', { current: zwiftId === result.profileId })}
              key={result._id}
            >
              <td className={styles.centerTd}>
                <TdRank
                  value={result.rankEvent}
                  isDsq={isDsq}
                  dsqType={dsqType}
                  dsqDescription={dsqDescription}
                />
              </td>
              <td>
                <CheckboxU
                  checked={result.isDisqualification ? true : false}
                  property={'isDisqualification'}
                  tooltip={'Дисквалификация райдера'}
                  handlerCheckbox={handlerCheckboxDSQ}
                  name={result._id}
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

              <TdWattsPerKg valueAddition={result.wattsPerKg.addition} />

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

export default TableRaceResultsEdit;
