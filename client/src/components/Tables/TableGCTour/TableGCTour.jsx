import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';

import { secondesToTimeThousandths } from '../../../utils/date-convert';
import { useFilterGC } from '../../../hook/useSortResults';
import { createCategoryCaption } from '../../../utils/category-caption';
import TdGap from '../Td/TdGap';
import CategoryBox from '../../CategoryBox/CategoryBox';
import TdRider from '../Td/TdRider';
import Rank from '../../Rank/Rank';
import FinishTime from '../../FinishTime/FinishTime';
import TeamLogoBox from '../../TeamLogoBox/TeamLogoBox';

import styles from '../Table.module.css';

import Thead from './Thead';

const cx = classnames.bind(styles);

function TableGCTour({ results, isSeriesCreator, orderedStages }) {
  const columnsCP = useSelector((state) => state.columnsCP.value);
  const { zwiftId } = useSelector((state) => state.checkAuth.value.user);
  const filterCategory = useSelector((state) => state.filterCategory.value);

  // Сортировка и фильтрация таблицы в зависимости от включенных фильтров.
  const filteredResult = useFilterGC(results);

  const allCategories = filterCategory.name === 'All';

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
          const gaps = allCategories
            ? result.gapsInCategories.absolute
            : result.gapsInCategories.category;

          const { profileData } = result;

          return (
            <tr
              className={cx('hover', { current: zwiftId === result.profileId })}
              key={result._id}
            >
              <td className={styles.centerTd}>
                <Rank
                  value={allCategories ? result.rank?.absolute : result.rank?.category}
                  disqualification={result.disqualification}
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

              {/* Принадлежность к команде */}
              <td>
                {profileData.team && (
                  <TeamLogoBox
                    team={profileData.team}
                    background={profileData.team?.appearance?.badgeBackground}
                    color={profileData.team?.appearance?.badgeTextColor}
                  />
                )}
              </td>

              <td>
                <FinishTime time={secondesToTimeThousandths(result.totalTimeInMilliseconds)} />
              </td>

              <TdGap gap={gaps?.toLeader} dsq={result.disqualification} />

              <TdGap gap={gaps?.toPrev} dsq={result.disqualification} />

              {/* Столбцы с результатами этапов */}
              {result.stages.map((stage, index) => {
                // Определение ранка на этапе (1, 2, 3) или null если вне топ-3
                const top3RankRace = [1, 2, 3].includes(stage.raceRank?.category)
                  ? stage.raceRank?.category
                  : null;

                return (
                  <td
                    key={stage.stageOrder}
                    className={cx({
                      'column--striped': index % 2 === 0,
                    })}
                  >
                    <Link
                      className={cx('link', 'timeWithRank')}
                      to={`stage/${stage.stageOrder}`}
                    >
                      <FinishTime
                        time={secondesToTimeThousandths(stage.durationInMilliseconds)}
                        dsq={stage.disqualification}
                        hideMs={true}
                      />

                      {allCategories ? null : (
                        <Rank
                          value={top3RankRace}
                          squareSize={16}
                          tooltip={`Занятое место на этапе: ${top3RankRace}`}
                        />
                      )}
                    </Link>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableGCTour;
