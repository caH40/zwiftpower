import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';

import { fetchGeneralClassification } from '../../../redux/features/api/series/fetchSeries';
import { resetGeneralClassificationStages } from '../../../redux/features/api/series/seriesPublicSlice';
import { getCategoriesSortedDry } from '../../UI/Filters/FilterCategory/categoriesSort';
import NavBarGCTable from '../../UI/NavBarGCTable/NavBarGCTable';
import TableGCEndurance from '../../Tables/TableGCEndurance/TableGCEndurance';
import ServiceBox from '../../ServiceBox/ServiceBox';

import styles from './EnduranceComponent.module.css';

/**
 * Компонент отображения результатов серии заездов типа Endurance.
 */
export default function EnduranceComponent() {
  const {
    generalClassification,
    seriesPublicOne: { urlSlug, orderedStages },
  } = useSelector((state) => state.seriesPublic);

  const filteredOrderedStages = [...new Set(orderedStages)];

  const location = useLocation();
  const dispatch = useDispatch();

  const isParentPath = location.pathname === `/series/${urlSlug}/results`;

  // Запрос на получение данных для итоговых страниц серии.
  useEffect(() => {
    if (!isParentPath) {
      return undefined;
    }
    dispatch(fetchGeneralClassification({ urlSlug }));

    return () => dispatch(resetGeneralClassificationStages());
  }, [isParentPath, dispatch, urlSlug]);

  return (
    <div>
      {isParentPath && filteredOrderedStages && generalClassification && (
        <>
          <nav className={styles.block__nav}>
            <NavBarGCTable
              results={generalClassification.results}
              categoriesButton={getCategoriesSortedDry({
                results: generalClassification.results,
                getCategory: (r) => r.finalCategory,
                needAbsolute: true,
              })}
            />
          </nav>

          <section className={styles.wrapper__wide}>
            <TableGCEndurance
              results={generalClassification.results}
              orderedStages={filteredOrderedStages}
            />

            <ServiceBox updated={generalClassification.gcResultsUpdatedAt} />
          </section>
        </>
      )}

      <Outlet />
    </div>
  );
}
