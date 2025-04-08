import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import NavBarSeriesPublicResults from '../../UI/NavBarSeriesPublicResults/NavBarSeriesPublicResults';

import styles from './TourComponent.module.css';

/**
 * Компонент отображения результатов серии заездов типа Tour.
 */
export default function TourComponent({ series }) {
  const location = useLocation();

  const isParentPath = location.pathname === `/series/${series.urlSlug}/results`;

  // Запрос на получение данных для итоговых страниц серии.
  useEffect(() => {
    if (!isParentPath) {
      return;
    }
  }, [isParentPath]);

  return (
    <div>
      {/* Кнопки навигации по страницам Серии заездов */}
      <div className={styles.box__navbar}>
        <NavBarSeriesPublicResults urlSlug={series.urlSlug} />
      </div>

      {isParentPath && <div>Итоговые таблицы серии</div>}

      <Outlet />
    </div>
  );
}
