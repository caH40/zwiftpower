import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import JSONBlock from '../../JSONBlock/JSONBlock';
import TableStageResults from '../../Tables/TableStageResults/TableStageResults';
import NavBarResultsRaceTable from '../../UI/NavBarResultsRaceTable/NavBarResultsRaceTable';
import { fetchGetStageResults } from '../../../redux/features/api/series/fetchSeries';
import { getCategoriesSortedNew } from '../../UI/Filters/FilterCategory/categoriesSort';

import styles from './StageResults.module.css';

/**
 * Страница с результатами этапа Серии заездов.
 */
export default function StageResults() {
  const { urlSlug, stageOrder } = useParams();
  const { stageResults } = useSelector((state) => state.seriesPublic);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetStageResults({ urlSlug, stageOrder }));
  }, [urlSlug, stageOrder, dispatch]);

  return (
    <section className={styles.wrapper__wide}>
      {stageResults && (
        <>
          <nav className={styles.block__nav}>
            {/* Фильтры данных в таблице */}
            <NavBarResultsRaceTable
              results={stageResults}
              hideDocsOnPage={true}
              hideFilterColumn={true}
              categoriesButton={getCategoriesSortedNew(stageResults)}
            />
          </nav>

          <TableStageResults results={stageResults} />
          <JSONBlock json={stageResults} />
        </>
      )}
    </section>
  );
}
