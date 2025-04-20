import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';

import { secondesToTimeThousandths } from '../../../utils/date-convert';
import { useFilterGC } from '../../../hook/useSortResults';
import TdGap from '../Td/TdGap';
import CategoryBox from '../../CategoryBox/CategoryBox';
import TdRider from '../Td/TdRider';
import Rank from '../../Rank/Rank';
import FinishTime from '../../FinishTime/FinishTime';

import styles from '../Table.module.css';

import Thead from './Thead';

const cx = classnames.bind(styles);

function TableGCTour({ results, isSeriesCreator, stages }) {
  const columnsCP = useSelector((state) => state.columnsCP.value);
  const { zwiftId } = useSelector((state) => state.checkAuth.value.user);
  const filterCategory = useSelector((state) => state.filterCategory.value);

  // Сортировка и фильтрация таблицы в зависимости от включенных фильтров.

  const filteredResult = useFilterGC(results);

  return (
    <table className={cx('table')}>
      <caption className={cx('caption')}>Генеральная классификация</caption>
      <Thead
        stages={stages.map((s) => ({ stageOrder: s }))}
        columnsCP={columnsCP}
        isAdmin={isSeriesCreator}
      />

      <tbody>
        {filteredResult?.map((result, index) => {
          // Объект с гэпами до лидера и до предыдущего райдера.
          const gaps =
            filterCategory.name === 'All'
              ? result.gapsInCategories.absolute
              : result.gapsInCategories.category;

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
              <TdRider profile={result.stages[0]?.profileData} profileId={result.profileId} />
              <td>
                <FinishTime time={secondesToTimeThousandths(result.totalTimeInMilliseconds)} />
              </td>

              <TdGap gap={gaps?.toLeader} dsq={result.disqualification?.status} />

              <TdGap gap={gaps?.toPrev} dsq={result.disqualification?.status} />

              {/* Столбцы с результатами этапов */}
              {result.stages.map((stage, index) => (
                <td
                  key={stage.stageOrder}
                  className={cx({
                    'column--striped': index % 2 === 0,
                  })}
                >
                  <Link className={styles.link} to={`stage/${stage.stageOrder}`}>
                    <FinishTime
                      time={secondesToTimeThousandths(stage.durationInMilliseconds)}
                      dsq={stage.disqualification}
                      hideMs={true}
                    />
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

export default TableGCTour;
