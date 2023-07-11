import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';
import TableCatchup from '../../components/Tables/TableCatchup/TableCatchup';
import { fetchResultsSeries } from '../../redux/features/api/resultsSeriesSlice';
import TableCatchupSummary from '../../components/Tables/TableCatchupSummary/TableCatchupSummary';

import styles from './Catchup.module.css';

function Catchup() {
  const { results, resultsSummary } = useSelector((state) => state.fetchResultsSeries);

  useTitle('Догонялки');
  useBackground(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchResultsSeries({ type: 'catchUp' }));
  }, [dispatch]);

  return (
    <section>
      {results[0] && (
        <div className={styles.block}>
          <div className={styles.box__total}>
            <TableCatchupSummary resultsSummary={resultsSummary} />
          </div>
          <div className={styles.box__results}>
            <TableCatchup catchups={results} />
          </div>
        </div>
      )}
    </section>
  );
}

export default Catchup;
