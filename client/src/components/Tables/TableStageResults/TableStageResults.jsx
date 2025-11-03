import { useState } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames/bind';

import { useSortStageResults } from '../../../hook/useSortResults';
import { getAgeCategory } from '../../../utils/age';
import { tdHeartRate, tdHeight, tdWatts } from '../utils/td';
import FinishTime from '../../FinishTime/FinishTime';
import { useFinishTime } from '../../../hook/useFinishTime';
import StageResultMenu from '../../StageResultMenu/StageResultMenu';
import CategoryBox from '../../CategoryBox/CategoryBox';
import TdRider from '../Td/TdRider';
import TdGap from '../Td/TdGap';
import TdWattsPerKg from '../Td/TdWattsPerKg';
import TdRank from '../Td/TdRank';
import TdDifferent from '../Td/TdDifferent';
import TdCpWattsNew from '../Td/TdCpWattsNew';
import TdWeight from '../Td/TdWeight';
import CategoryChangeBox from '../../CategoryChangeBox/CategoryChangeBox';
import { useUserRole } from '../../../hook/useUserRole';

import styles from '../Table.module.css';

import Thead from './Thead';
import { getSeriesCaption } from './utils';
import { raceResultsColumnsCP } from './column-titles';

const cx = classnames.bind(styles);

function TableStageResults({
  results,
  isSeriesCreator,

  stageOrder,
  stageName,
  stageStart,
  seriesCategories,
  urlSlug,
}) {
  // id ячеек столбца на который наведен курсор мышки.
  const [columnActive, setColumnActive] = useState(false);
  const { isAdmin } = useUserRole();
  const columnsCP = useSelector((state) => state.columnsCP.value);
  const { zwiftId } = useSelector((state) => state.checkAuth.value.user);
  const filterCategory = useSelector((state) => state.filterCategory.value);

  // Сортировка и фильтрация таблицы в зависимости от включенных фильтров.
  const resultSortedAndFiltered = useSortStageResults(results, 'classicGroup');
  const resultWithFinishTime = useFinishTime(resultSortedAndFiltered);

  return (
    <table className={cx('table')}>
      <caption className={cx('caption')}>
        {getSeriesCaption({
          stageName,
          stageOrder,
          stageStart,
          categoryLabel: filterCategory.name,
        })}
      </caption>
      <Thead columnsCP={columnsCP} isSeriesCreator={isSeriesCreator} isAdmin={isAdmin} />

      <tbody>
        {resultWithFinishTime?.map(
          ({ category, categoryInRace, modifiedCategory, ...result }) => {
            const profile = result.profileData;
            const isDsq = result.isDisqualification;
            const dsqType = result.disqualification;
            const dsqDescription = result.disqualificationDescription;

            const isAbsolute = filterCategory.name === 'All';

            return (
              <tr
                className={cx('hover', { current: zwiftId === result.profileId })}
                key={result._id}
              >
                <td className={styles.centerTd}>
                  <TdRank
                    value={isAbsolute ? result.rank.absolute : result.rank.category}
                    // isDsq={forDNF ? true : isDsq}
                    // dsqType={forDNF ? 'DNF' : dsqType}
                    dsqDescription={dsqDescription}
                  />
                </td>
                <td>
                  <CategoryBox showLabel={true} label={category} circle={true} />
                </td>
                <TdRider profile={profile} profileId={result.profileId} />
                <td>
                  <FinishTime time={result.finishTime} />
                </td>
                <TdGap
                  gap={
                    isAbsolute
                      ? result.gapsInCategories.absolute?.toLeader
                      : result.gapsInCategories.category?.toLeader
                  }
                  dsq={isDsq}
                />
                <TdGap
                  gap={
                    isAbsolute
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
                <td>
                  {category !== categoryInRace ? (
                    <CategoryChangeBox
                      PrevCategory={
                        <CategoryBox showLabel={true} label={categoryInRace} circle={true} />
                      }
                      Category={<CategoryBox showLabel={true} label={category} circle={true} />}
                      modifiedCategory={modifiedCategory}
                    />
                  ) : null}
                </td>

                {/* Модерация данных райдера */}
                {(isSeriesCreator || isAdmin) && (
                  <td>
                    <StageResultMenu
                      seriesCategories={seriesCategories}
                      category={result.category}
                      modifiedCategory={modifiedCategory}
                      disqualification={result.disqualification}
                      penalty={result.penalty}
                      profile={profile}
                      seriesId={result.series}
                      stageResultId={result._id}
                      urlSlug={urlSlug}
                      stageOrder={stageOrder}
                    />
                  </td>
                )}
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
}

export default TableStageResults;
