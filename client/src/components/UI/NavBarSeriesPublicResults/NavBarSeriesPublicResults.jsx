import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { addClasses as cns } from '../../../utils/additional-classes';
import { createSeriesResultsButtons } from '../../../assets/series-buttons';
import { getButtonClasses } from '../../../utils/buttonClasses';

import styles from './NavBarSeriesPublicResults.module.css';

/**
 * Кнопки для навигации между результатами Этапов серии и итоговыми таблицами.
 */
export default function NavBarSeriesPublicResults({ urlSlug, orderedStages, addCls }) {
  const buttons = createSeriesResultsButtons(orderedStages);

  return (
    <nav className={cn(styles.wrapper, cns(styles, addCls))}>
      <div className={styles.wrapper__buttons}>
        {buttons.map((buttonLink, index) => (
          <NavLink
            className={({ isActive }) =>
              getButtonClasses({ isActive, index, styles, quantityBtn: buttons.length })
            }
            to={`/series/${urlSlug}/results${buttonLink.page}`}
            key={buttonLink.id}
            end={true}
          >
            {buttonLink.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
