import FilterCategory from '../Filters/FilterCategory/FilterCategory';

import styles from './NavBarGCTable.module.css';

function NavBarGCTable({ results, categoriesButton }) {
  return (
    <div className={styles.box}>
      <FilterCategory results={results} categoriesFromFilters={categoriesButton} />
    </div>
  );
}

export default NavBarGCTable;
