import FilterColumn from '../Filters/FilterColumn/FilterColumn';
import FilterWatts from '../Filters/FilterWatts/FilterWatts';

import styles from './NavBarSignedRiders.module.css';

/**
 * Фильтры отображения таблицы с зарегистрированными райдерами в Эвенте
 */
function NavBarSignedRiders() {
  return (
    <div className={styles.box}>
      <FilterWatts />
      <FilterColumn />
    </div>
  );
}

export default NavBarSignedRiders;
