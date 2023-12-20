import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import useTitle from '../../hook/useTitle';
import TableCatchup from '../../components/Tables/TableCatchup/TableCatchup';
import { fetchResultsSeries } from '../../redux/features/api/resultsSeriesSlice';
import TableCatchupSummary from '../../components/Tables/TableCatchupSummary/TableCatchupSummary';
import FilterCatchup from '../../components/UI/Filters/FilterCatchup/FilterColumn';

import styles from './Catchup.module.css';

function Catchup() {
  const { season } = useParams();
  const navigate = useNavigate();

  const { results, resultsSummary } = useSelector((state) => state.fetchResultsSeries);

  useTitle('Догонялки');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchResultsSeries({ type: 'catchUp', season }));
  }, [dispatch, season]);

  const getLink = (season) => {
    navigate(`/race/series/catchup/${season}`);
  };

  return (
    <section>
      <div className={styles.box__filter}>
        <FilterCatchup season={season} reducer={getLink} />
      </div>
      {results[0] && (
        <div className={styles.block}>
          <div className={styles.box__total}>
            <TableCatchupSummary resultsSummary={resultsSummary} />
          </div>
          <section className={styles.wrapper__wide}>
            <TableCatchup catchups={results} />
          </section>
        </div>
      )}
    </section>
  );
}

export default Catchup;
