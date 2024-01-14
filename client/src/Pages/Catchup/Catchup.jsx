import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { useAd } from '../../hook/useAd';
import AdContainer from '../../components/AdContainer/AdContainer';
import { HelmetCatchup } from '../../components/Helmets/HelmetCatchup';
import useTitle from '../../hook/useTitle';
import TableCatchup from '../../components/Tables/TableCatchup/TableCatchup';
import { fetchResultsSeries } from '../../redux/features/api/resultsSeriesSlice';
import TableCatchupSummary from '../../components/Tables/TableCatchupSummary/TableCatchupSummary';
import FilterCatchup from '../../components/UI/Filters/FilterCatchup/FilterColumn';

import styles from './Catchup.module.css';

// рекламные блоки на странице
const adNumbers = [3];

function Catchup() {
  const seasonCurrent = new Date().getFullYear() - 1;

  const { season = seasonCurrent } = useParams();
  const navigate = useNavigate();

  const { results, resultsSummary } = useSelector((state) => state.fetchResultsSeries);

  useTitle('Догонялки (CatchUp)');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchResultsSeries({ type: 'catchUp', season }));
  }, [dispatch, season]);

  const getLink = (season) => {
    navigate(`/race/series/catchup/${season}`);
  };

  useAd(adNumbers);

  return (
    <>
      <section className={styles.wrapper}>
        <HelmetCatchup season={season} />
        <div className={styles.box__filter}>
          <FilterCatchup season={season} reducer={getLink} />
        </div>
        {results[0] && (
          <div className={styles.block}>
            {resultsSummary && (
              <div className={styles.box__total}>
                <TableCatchupSummary resultsSummary={resultsSummary} />
              </div>
            )}
            <section className={styles.wrapper__wide}>
              <TableCatchup catchups={results} />
            </section>
          </div>
        )}
      </section>
      <AdContainer number={3} />
    </>
  );
}

export default Catchup;
