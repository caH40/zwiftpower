import FilterPeriods from '../FilterPeriods/FilterPeriods';

import styles from './NavBarRidersInEvent.module.css';

function NavBarRidersInEvent({ form, setForm }) {
  return (
    <div className={styles.block}>
      <FilterPeriods form={form} setForm={setForm} />
    </div>
  );
}

export default NavBarRidersInEvent;
