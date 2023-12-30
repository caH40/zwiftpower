import FilterWatts from '../Filters/FilterWatts/FilterWatts';

import styles from './NavBarScheduleRace.module.css';

/**
 * Фильтры отображения таблицы с зарегистрированными райдерами в Эвенте
 */
function NavBarScheduleRace() {
  return (
    <div className={styles.box}>
      <FilterWatts />
    </div>
  );
}

export default NavBarScheduleRace;
