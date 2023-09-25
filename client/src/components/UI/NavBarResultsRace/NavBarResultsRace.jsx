import React from 'react';

import FilterCategory from '../Filters/FilterCategory/FilterCategory';
import FilterWatts from '../Filters/FilterWatts/FilterWatts';
import FilterColumn from '../Filters/FilterColumn/FilterColumn';

import styles from './NavBarResultsRace.module.css';

function NavBarResultsRace({ results, hideCategory }) {
  return (
    <div className={styles.box}>
      {hideCategory ? null : <FilterCategory results={results} />}
      <FilterWatts />
      <FilterColumn />
    </div>
  );
}

export default NavBarResultsRace;
