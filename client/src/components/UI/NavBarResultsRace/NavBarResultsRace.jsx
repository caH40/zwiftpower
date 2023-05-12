import React from 'react';

import FilterCategory from '../Filters/FilterCategory/FilterCategory';
import FilterWatts from '../Filters/FilterWatts/FilterWatts';
import FilterColumn from '../Filters/FilterColumn/FilterColumn';
import { useResize } from '../../../hook/use-resize';

import styles from './NavBarResultsRace.module.css';

function NavBarResultsRace({ results }) {
  const { isScreenLg } = useResize();
  return (
    <div className={styles.box}>
      <FilterCategory results={results} />
      {isScreenLg && <FilterWatts />}
      {isScreenLg && <FilterColumn />}
    </div>
  );
}

export default NavBarResultsRace;
