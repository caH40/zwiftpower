import { useState } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames/bind';

import { tdTimeNew } from '../utils/td';
import { secondesToTimeThousandths } from '../../../utils/date-convert';
import TdGap from '../Td/TdGap';
import CategoryBox from '../../CategoryBox/CategoryBox';
import TdRider from '../Td/TdRider';
import TdRank from '../Td/TdRank';

import styles from '../Table.module.css';

import Thead from './Thead';
import { getSeriesCaption } from './utils';

const cx = classnames.bind(styles);

function TableGCTour({ results, isSeriesCreator, stages }) {
  // id ячеек столбца на который наведен курсор мышки.
  const [columnActive, setColumnActive] = useState(false);

  const columnsCP = useSelector((state) => state.columnsCP.value);
  const { zwiftId } = useSelector((state) => state.checkAuth.value.user);
  const filterCategory = useSelector((state) => state.filterCategory.value);

  // Сортировка и фильтрация таблицы в зависимости от включенных фильтров.

  // const resultWithFinishTime = useFinishTime(results);

  return (
    <table className={cx('table')}>
      {/* <caption className={cx('caption')}>
        {getSeriesCaption({ stageName, stageOrder, stageStart })}
      </caption> */}
      <Thead
        stages={stages.map((s) => ({ stageOrder: s }))}
        columnsCP={columnsCP}
        isAdmin={isSeriesCreator}
      />

      <tbody>
        {results?.slice(0, 5).map((result, index) => {
          // const isDsq = result.isDisqualification;
          // const dsqType = result.disqualification;
          // const dsqDescription = result.disqualificationDescription;

          return (
            <tr
              className={cx('hover', { current: zwiftId === result.profileId })}
              key={result._id}
            >
              <td className={styles.centerTd}>
                <TdRank
                  value={
                    filterCategory.name === 'All'
                      ? result.rank?.absolute
                      : result.rank?.category
                  }
                  // isDsq={forDNF ? true : isDsq}
                  // dsqType={forDNF ? 'DNF' : dsqType}
                  // dsqDescription={dsqDescription}
                />
              </td>
              <td>
                <CategoryBox showLabel={true} label={result.finalCategory} circle={true} />
              </td>
              <TdRider profile={result.stages[0]?.profileData} profileId={result.profileId} />
              <td>{tdTimeNew(secondesToTimeThousandths(result.totalTimeInMilliseconds))}</td>

              {/* <TdGap
                gap={
                  filterCategory.name === 'All'
                    ? result.gapsInCategories.absolute?.toPrev
                    : result.gapsInCategories.category?.toPrev
                }
                dsq={isDsq}
              /> */}

              <td></td>
              <td></td>

              {result.stages.map((stage) => (
                <td key={stage.stageOrder}>
                  {tdTimeNew(secondesToTimeThousandths(stage.durationInMilliseconds))}
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
