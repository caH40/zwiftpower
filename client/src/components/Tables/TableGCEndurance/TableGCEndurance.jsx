import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';

import {
  secondesToMinutes,
  secondesToTime,
  secondesToTimeThousandths,
} from '../../../utils/date-convert';
import { useFilterGC } from '../../../hook/useSortResults';
import TdGap from '../Td/TdGap';
import CategoryBox from '../../CategoryBox/CategoryBox';
import TdRider from '../Td/TdRider';
import Rank from '../../Rank/Rank';
import FinishTime from '../../FinishTime/FinishTime';
import { createCategoryCaption } from '../../../utils/category-caption';

import styles from '../Table.module.css';

import Thead from './Thead';

const cx = classnames.bind(styles);

function TableGCEndurance({ results, isSeriesCreator, orderedStages }) {
  const columnsCP = useSelector((state) => state.columnsCP.value);
  const { zwiftId } = useSelector((state) => state.checkAuth.value.user);
  const filterCategory = useSelector((state) => state.filterCategory.value);

  // Сортировка и фильтрация таблицы в зависимости от включенных фильтров.
  const filteredResult = useFilterGC(results);

  return (
    <table className={cx('table')}>
      <caption className={cx('caption')}>
        Генеральная классификация. {createCategoryCaption(filterCategory.name)}
      </caption>
      <Thead
        stages={orderedStages.map((s) => ({ stageOrder: s }))}
        columnsCP={columnsCP}
        isAdmin={isSeriesCreator}
      />

      <tbody>
        {filteredResult?.map((result) => {
          const profileData = result.stages.findLast(
            (stage) => stage?.profileData
          )?.profileData;

          return (
            <tr
              className={cx('hover', { current: zwiftId === result.profileId })}
              key={result._id}
            >
              <td className={styles.centerTd}>
                <Rank
                  value={
                    filterCategory.name === 'All'
                      ? result.rank?.absolute
                      : result.rank?.category
                  }
                  dsq={result.disqualification}
                />
              </td>
              <td>
                <CategoryBox showLabel={true} label={result.finalCategory} circle={true} />
              </td>

              {profileData ? (
                <TdRider profile={profileData} profileId={result.profileId} />
              ) : (
                <span>Нет данных</span>
              )}
              <td>
                {result.totalDistanceInMeters / 1000}
                <span className={styles.small}>км</span>
              </td>
              <td>
                {result.totalElevationInMeters}
                <span className={styles.small}>м</span>
              </td>
              <td>
                <span></span>
                {result.totalCalories}
                <span className={styles.small}>ккал</span>
              </td>

              <td>{secondesToTime(result.totalTimeInMilliseconds)}</td>
              <td>{result.stagesCompleted}</td>

              {/* Столбцы с результатами этапов */}
              {result.stages.map((stage, index) => (
                <td
                  key={stage.stageOrder}
                  className={cx({
                    'column--striped': index % 2 === 0,
                  })}
                >
                  <Link className={styles.link} to={`stage/${stage.stageOrder}`}>
                    {stage.distanceInMeters ? (
                      <>
                        <span>{stage.distanceInMeters / 1000}</span>
                        <span className={styles.small}>км</span>
                      </>
                    ) : null}
                  </Link>
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableGCEndurance;
