import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { useAd } from '../../hook/useAd';
import AdContainer from '../../components/AdContainer/AdContainer';
import useTitle from '../../hook/useTitle';
import TableCatchup from '../../components/Tables/TableCatchup/TableCatchup';
import {
  fetchResultsSeries,
  resetCatchData,
} from '../../redux/features/api/resultsSeriesSlice';
import TableCatchupSummary from '../../components/Tables/TableCatchupSummary/TableCatchupSummary';
import FilterCatchup from '../../components/UI/Filters/FilterCatchup/FilterColumn';
import { useResize } from '../../hook/use-resize';
import { HelmetCatchup } from '../../components/Helmets/HelmetCatchup';
import SkeletonTable from '../../components/SkeletonLoading/SkeletonTable/SkeletonTable';

import styles from './Catchup.module.css';

// рекламные блоки на странице
const adOverFooter = 8;
const adUnderHeader = 3;
const adNumbers = [adOverFooter, adUnderHeader];

function Catchup() {
  const { isScreenLg: isDesktop } = useResize();
  const seasonCurrent = new Date().getFullYear() - 1;

  const { season = seasonCurrent } = useParams();
  const navigate = useNavigate();

  const {
    results,
    resultsSummary,
    status: statusFetchResultsSeries,
  } = useSelector((state) => state.fetchResultsSeries);

  useTitle('Догонялки (CatchUp)');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchResultsSeries({ type: 'catchUp', season }));

    return () => dispatch(resetCatchData());
  }, [dispatch, season]);

  const getLink = (season) => {
    navigate(`/race/series/catchup/${season}`);
  };

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
          {!!resultsSummary?.length && statusFetchResultsSeries === 'resolved' && (
            <section className={styles.box__total}>
              <TableCatchupSummary resultsSummary={resultsSummary} />
            </section>
          )}

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
