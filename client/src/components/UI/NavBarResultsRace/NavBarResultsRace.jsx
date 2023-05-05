import React from 'react';

import FilterCategory from '../Filters/FilterCategory/FilterCategory';
import FilterWatts from '../Filters/FilterWatts/FilterWatts';
// import FilterColumn from '../Filters/FilterColumn/FilterColumn';

import styles from './NavBarResultsRace.module.css';

function NavBarResultsRace({ results }) {
  return (
    <div className={styles.box}>
      <FilterCategory results={results} />
      <FilterWatts />
      {/* <FilterColumn /> */}
    </div>
  );
}

export default NavBarResultsRace;
