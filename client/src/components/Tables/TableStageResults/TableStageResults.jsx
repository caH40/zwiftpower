import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames/bind';

import { useSortStageResults } from '../../../hook/useSortResults';
import { getAgeCategory } from '../../../utils/age';
import { tdHeartRate, tdHeight, tdTimeNew, tdWatts } from '../utils/td';
import { useFinishTime } from '../../../hook/useFinishTime';
import IconEdit from '../../icons/IconEdit';
import CategoryBox from '../../CategoryBox/CategoryBox';
import TdRider from '../Td/TdRider';
import TdGap from '../Td/TdGap';
import TdWattsPerKg from '../Td/TdWattsPerKg';
import TdRank from '../Td/TdRank';
import TdDifferent from '../Td/TdDifferent';
import TdCpWattsNew from '../Td/TdCpWattsNew';
import TdWeight from '../Td/TdWeight';

import styles from '../Table.module.css';

import Thead from './Thead';
import { getSeriesCaption } from './utils';
import { raceResultsColumnsCP } from './column-titles';

const cx = classnames.bind(styles);

function TableStageResults({ results, isSeriesCreator, stageOrder, stageName, stageStart }) {
  // id ячеек столбца на который наведен курсор мышки.
  const [columnActive, setColumnActive] = useState(false);

  const columnsCP = useSelector((state) => state.columnsCP.value);
  const { zwiftId } = useSelector((state) => state.checkAuth.value.user);
  const filterCategory = useSelector((state) => state.filterCategory.value);

  // Сортировка и фильтрация таблицы в зависимости от включенных фильтров.
  const resultSortedAndFiltered = useSortStageResults(results, 'classicGroup');
  const resultWithFinishTime = useFinishTime(resultSortedAndFiltered);

  return (
    <table className={cx('table')}>
      <caption className={cx('caption')}>
        {getSeriesCaption({ stageName, stageOrder, stageStart })}
      </caption>
      <Thead columnsCP={columnsCP} isAdmin={isSeriesCreator} />

      <tbody>
        {resultWithFinishTime?.map((result, index) => {
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
                  value={
                    filterCategory.name === 'All' ? result.rank.absolute : result.rank.category
                  }
                  // isDsq={forDNF ? true : isDsq}
                  // dsqType={forDNF ? 'DNF' : dsqType}
                  dsqDescription={dsqDescription}
                />
              </td>
              <td>
                <CategoryBox showLabel={true} label={result.category} circle={true} />
              </td>
              <TdRider profile={profile} profileId={result.profileId} />
              <td>{tdTimeNew(result.finishTime)}</td>
              <TdGap
                gap={
                  filterCategory.name === 'All'
                    ? result.gapsInCategories.absolute?.toLeader
                    : result.gapsInCategories.category?.toLeader
                }
                dsq={isDsq}
              />
              <TdGap
                gap={
                  filterCategory.name === 'All'
                    ? result.gapsInCategories.absolute?.toPrev
                    : result.gapsInCategories.category?.toPrev
                }
                dsq={isDsq}
              />
              <TdWattsPerKg valueAddition={result.wattsPerKg} />
              <td>{tdWatts(result.sensorData.avgWatts)}</td>

              {/* Колонки с Critical POwer */}
              {raceResultsColumnsCP.map((column, indexColumnCP) => {
                const id = `TdCpWatts-${indexColumnCP}`;

                return (
                  <TdCpWattsNew
                    cpBestEfforts={result.cpBestEfforts}
                    interval={column.interval}
                    key={column.id}
                    id={id}
                    onMouseEnter={() => setColumnActive(id)}
                    onMouseLeave={() => setColumnActive(null)}
                    hoverEnabled={columnActive === id}
                  />
                );
              })}

              <td>{tdHeartRate(result.sensorData.heartRateData.avgHeartRate)}</td>
              <TdWeight weight={profile.weightInGrams} zwiftId={result.profileId} />
              <td>{tdHeight(profile.heightInCentimeters)}</td>
              <td>{getAgeCategory(profile.age)}</td>
              <TdDifferent isPairedSteeringDevice={result.sensorData.pairedSteeringDevice} />

              {/* Модерация данных райдера */}
              {isSeriesCreator && (
                <td>
                  <Link to={`/admin/riders/${result.profileId}/main`}>
                    <IconEdit squareSize={20} />
                  </Link>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableStageResults;
