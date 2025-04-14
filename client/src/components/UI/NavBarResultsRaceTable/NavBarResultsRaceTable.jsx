import FilterCategory from '../Filters/FilterCategory/FilterCategory';
import FilterWatts from '../Filters/FilterWatts/FilterWatts';
import FilterColumn from '../Filters/FilterColumn/FilterColumn';
import PaginationSelect from '../PaginationSelect/PaginationSelect';
import { records } from '../../../assets/constants';

import styles from './NavBarResultsRaceTable.module.css';

function NavBarResultsRace({
  results,
  hideCategory,
  docsOnPage,
  setDocsOnPage,
  setPage,
  hideDocsOnPage,
  hideFilterColumn,
  categoriesButton,
}) {
  return (
    <div className={styles.box}>
      {hideCategory ? null : (
        <FilterCategory results={results} categoriesFromFilters={categoriesButton} />
      )}
      <FilterWatts />

      {!hideFilterColumn && <FilterColumn />}

      {!hideDocsOnPage && (
        <PaginationSelect
          docsOnPage={docsOnPage}
          setDocsOnPage={setDocsOnPage}
          records={records}
          setPage={setPage}
        />
      )}
    </div>
  );
}

export default NavBarResultsRace;
