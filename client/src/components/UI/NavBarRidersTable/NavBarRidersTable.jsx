import FilterCategoryNew from '../Filters/FilterCategory/FilterCategoryNew';
import PaginationSelect from '../PaginationSelect/PaginationSelect';
import PaginationInput from '../PaginationInput/PaginationInput';
import { records } from '../../../assets/constants';

import styles from './NavBarRidersTable.module.css';

function NavBarRidersTable({
  hideCategory,
  docsOnPage,
  setDocsOnPage,
  setPage,
  hideDocsOnPage,
  search,
  setSearch,
  placeholder,
}) {
  const categories = ['All', 'A', 'B', 'C', 'D', 'E'];
  return (
    <div className={styles.box}>
      {hideCategory ? null : <FilterCategoryNew categories={categories} />}

      <PaginationInput
        search={search}
        setSearch={setSearch}
        placeholder={placeholder}
        setPage={setPage}
      />

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

export default NavBarRidersTable;
