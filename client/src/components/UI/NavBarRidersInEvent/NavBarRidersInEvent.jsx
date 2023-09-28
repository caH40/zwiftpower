import FilterPeriods from '../FilterPeriods/FilterPeriods';

import styles from './NavBarRidersInEvent.module.css';

function NavBarRidersInEvent() {
  return (
    <div className={styles.block}>
      <FilterPeriods />
    </div>
  );
}

export default NavBarRidersInEvent;
