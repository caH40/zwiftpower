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
import { createCategoryCaption } from '../../../utils/category-caption';

import styles from '../Table.module.css';

import Thead from './Thead';

const cx = classnames.bind(styles);

function TableGCTour({ results, isSeriesCreator, orderedStages }) {
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
          // Объект с гэпами до лидера и до предыдущего райдера.
          const gaps =
            filterCategory.name === 'All'
              ? result.gapsInCategories.absolute
              : result.gapsInCategories.category;

          /**
           * берутся данные профиля из Этапа под нулевым индексом в массиве этапов, но если райдер
           * не проезжал этот этап, то данных нет и выскакивает ошибка. Необходимо продумать как
           *  получать данные профиля, с какого этапа брать данные. Теоретически профиля могут
           * изменятся от этапа к этапу. Брать из последнего (самые свежие данные)
           */
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
