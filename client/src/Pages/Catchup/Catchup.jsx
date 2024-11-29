import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import {
  fetchResultsSeries,
  resetCatchData,
} from '../../redux/features/api/resultsSeriesSlice';
import { useAd } from '../../hook/useAd';
import { useResize } from '../../hook/use-resize';
import { HelmetCatchup } from '../../components/Helmets/HelmetCatchup';
import AdContainer from '../../components/AdContainer/AdContainer';
import useTitle from '../../hook/useTitle';
import TableCatchup from '../../components/Tables/TableCatchup/TableCatchup';
import TableCatchupSummary from '../../components/Tables/TableCatchupSummary/TableCatchupSummary';
import FilterCatchup from '../../components/UI/Filters/FilterCatchup/FilterColumn';
import SkeletonTable from '../../components/SkeletonLoading/SkeletonTable/SkeletonTable';
import TableCatchupLeaders from '../../components/Tables/TableCatchupLeaders/TableCatchupLeaders';

import styles from './Catchup.module.css';

// Рекламные блоки на странице.
const adOverFooter = 8;
const adUnderHeader = 3;
const adNumbers = [adOverFooter, adUnderHeader];

/**
 * Компонент для отображения страницы "Догонялки".
 * @returns {JSX.Element} Страница с результатами догонялок.
 */
function Catchup() {
  const { isScreenLg: isDesktop } = useResize();

  // Определяем текущий сезон (предыдущий год).
  const seasonCurrent = new Date().getFullYear() - 1;

  // Получаем сезон из параметров URL или используем текущий сезон по умолчанию.
  const { season = seasonCurrent } = useParams();
  const navigate = useNavigate();

  const {
    results,
    resultsSummary,
    leaderboard,
    status: statusFetchResultsSeries,
  } = useSelector((state) => state.fetchResultsSeries);

  useTitle('Догонялки (CatchUp)');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchResultsSeries({ type: 'catchUp', season }));

    return () => dispatch(resetCatchData());
  }, [dispatch, season]);

  // Функция для навигации по сезонам.
  const getLink = (season) => {
    navigate(`/race/series/catchup/${season}`);
  };

  // Определяем категории, включаем 'D' для сезонов после 2023 года.
  const categories = ['A', 'B', 'C'];
  if (+season > 2023) {
    categories.push('D', 'E');
  }

  // const leaderboardFiltered = leaderboard.filter((elm) => +season < 2024 && elm.category)

  useAd(adNumbers);
  return (
    <>
      <HelmetCatchup season={season} />
      <div className={styles.wrapper}>
        {isDesktop ? (
          <AdContainer number={adUnderHeader} height={180} marginBottom={10} />
        ) : null}
        <div className={styles.box__filter}>
          <FilterCatchup season={season} reducer={getLink} />
        </div>

        <div className={styles.block}>
          {/* Таблица побед каждой группы */}
          {!!resultsSummary?.length && statusFetchResultsSeries === 'resolved' && (
            <section className={styles.box__total}>
              <TableCatchupSummary resultsSummary={resultsSummary} categories={categories} />
            </section>
          )}

          {/* Таблица лидеров по победам в группах */}
          {!!leaderboard?.length && (
            <section className={styles.wrapper__wide}>
              {/* скелетон загрузки */}
              <SkeletonTable
                status={statusFetchResultsSeries}
                rows={20}
                needCaption={true}
                height={40}
              />
              <TableCatchupLeaders leaderboard={leaderboard} />
            </section>
          )}

          {/* Таблица победителей в заездах */}
          <section className={styles.wrapper__wide}>
            {/* скелетон загрузки */}
            <SkeletonTable
              status={statusFetchResultsSeries}
              rows={20}
              needCaption={true}
              height={40}
            />
            {!!results.length && statusFetchResultsSeries === 'resolved' && (
              <TableCatchup catchups={results} />
            )}
          </section>
        </div>
      </div>

      {isDesktop ? (
        <AdContainer number={adOverFooter} maxWidth={1105} />
      ) : (
        <AdContainer number={adUnderHeader} />
      )}
    </>
  );
}

export default Catchup;
