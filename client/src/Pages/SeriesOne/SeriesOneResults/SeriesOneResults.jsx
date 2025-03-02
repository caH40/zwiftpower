import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';

import useTitle from '../../../hook/useTitle';

// Динамический импорт компонентов для различных типов серии заездов.
const SeriesSingleComponent = lazy(() =>
  import('../../../components/SeriesResults/SeriesSingleComponent/SeriesSingleComponent')
);
const TourComponent = lazy(() =>
  import('../../../components/SeriesResults/TourComponent/TourComponent')
);
const CatchUpComponent = lazy(() =>
  import('../../../components/SeriesResults/CatchUpComponent/CatchUpComponent')
);
const CriteriumComponent = lazy(() =>
  import('../../../components/SeriesResults/CriteriumComponent/CriteriumComponent')
);

import styles from './SeriesOneResults.module.css';

/**
 * Страница с результатами генеральных зачетов серии заездов.
 */
export default function SeriesOneResults() {
  // Получаем данные о текущей серии заездов из состояния Redux.
  const { seriesPublicOne } = useSelector((state) => state.seriesPublic);

  // Устанавливаем заголовок страницы с названием серии заездов.
  useTitle(`Результаты ${seriesPublicOne?.name || 'Серия заездов'}`);

  // Сопоставляем тип серии с соответствующим компонентом.
  const componentsMap = {
    series: (props) => <SeriesSingleComponent {...props} />,
    tour: (props) => <TourComponent {...props} />,
    catchUp: (props) => <CatchUpComponent {...props} />,
    criterium: (props) => <CriteriumComponent {...props} />,
  };

  return (
    <div className={styles.wrapper}>
      {/* Используем Suspense для отложенной загрузки компонентов. */}
      <Suspense>
        {seriesPublicOne?.type &&
          componentsMap[seriesPublicOne.type]({ series: seriesPublicOne })}
      </Suspense>
    </div>
  );
}
