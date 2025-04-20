import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import TableStageResults from '../../Tables/TableStageResults/TableStageResults';
import NavBarResultsRaceTable from '../../UI/NavBarResultsRaceTable/NavBarResultsRaceTable';
import { fetchGetStageResults } from '../../../redux/features/api/series/fetchSeries';
import { getCategoriesSortedDry } from '../../UI/Filters/FilterCategory/categoriesSort';
import { resetStageResults } from '../../../redux/features/api/series/seriesPublicSlice';

import styles from './StageResults.module.css';

/**
 * Страница с результатами этапа Серии заездов.
 */
export default function StageResults() {
  const { urlSlug, stageOrder } = useParams();
  const { stageResults, seriesPublicOne } = useSelector((state) => state.seriesPublic);

  // Может быть несколько этапов с одинаковым номером (order), но разными eventStart.
  // Необходимо выбирать наименьший eventStart и stageName в этапах с одним номером (order).
  const stageData = useMemo(() => {
    if (!seriesPublicOne) {
      return null;
    }

    return [...seriesPublicOne.stages]
      .sort((a, b) => new Date(a.eventStart) - new Date(b.eventStart))
      .find((stage) => stage.order === +stageOrder);
  }, [seriesPublicOne, stageOrder]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetStageResults({ urlSlug, stageOrder }));

    return () => dispatch(resetStageResults());
  }, [urlSlug, stageOrder]);

  return (
    <section className={styles.wrapper}>
      {stageResults && stageData && (
        <>
          <nav className={styles.block__nav}>
            {/* Фильтры данных в таблице */}
            <NavBarResultsRaceTable
              results={stageResults}
              hideDocsOnPage={true}
              hideFilterColumn={true}
              categoriesButton={getCategoriesSortedDry({
                results: stageResults,
                needAbsolute: true,
                getCategory: (r) => r.category,
              })}
            />
          </nav>

          <div className={styles.wrapper__wide}>
            <TableStageResults
              results={stageResults}
              stageOrder={stageOrder}
              stageName={stageData.name}
              stageStart={stageData.eventStart}
            />
          </div>
        </>
      )}
    </section>
  );
}
