import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';

import { resetGeneralClassificationStages } from '../../../redux/features/api/series/seriesPublicSlice';
import { fetchGeneralClassification } from '../../../redux/features/api/series/fetchSeries';
import { getCategoriesSortedDry } from '../../UI/Filters/FilterCategory/categoriesSort';
import NavBarGCTable from '../../UI/NavBarGCTable/NavBarGCTable';
import NavBarSeriesPublicResults from '../../UI/NavBarSeriesPublicResults/NavBarSeriesPublicResults';
import JSONBlock from '../../JSONBlock/JSONBlock';
import TableGCTour from '../../Tables/TableGCTour/TableGCTour';

import styles from './TourComponent.module.css';

/**
 * Компонент отображения результатов серии заездов типа Tour.
 */
export default function TourComponent({ series }) {
  const { generalClassification, seriesPublicOne } = useSelector((state) => state.seriesPublic);

  const location = useLocation();
  const dispatch = useDispatch();

  const isParentPath = location.pathname === `/series/${series.urlSlug}/results`;

  // Запрос на получение данных для итоговых страниц серии.
  useEffect(() => {
    if (!isParentPath) {
      return undefined;
    }
    dispatch(fetchGeneralClassification({ urlSlug: series.urlSlug }));

    return () => dispatch(resetGeneralClassificationStages());
  }, [isParentPath]);

  return (
    <div>
      {/* Кнопки навигации по страницам Серии заездов */}
      <div className={styles.box__navbar}>
        <NavBarSeriesPublicResults
          urlSlug={series.urlSlug}
          orderedStages={series.orderedStages}
        />
      </div>

      {isParentPath && seriesPublicOne && generalClassification && (
        <>
          <nav className={styles.block__nav}>
            <NavBarGCTable
              results={generalClassification}
              categoriesButton={getCategoriesSortedDry({
                results: generalClassification,
                getCategory: (r) => r.finalCategory,
                needAbsolute: true,
              })}
            />
          </nav>

          <TableGCTour results={generalClassification} stages={seriesPublicOne.orderedStages} />
        </>
      )}

      <Outlet />
      <JSONBlock json={generalClassification} />
    </div>
  );
}
