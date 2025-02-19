import PaginationSelect from '../PaginationSelect/PaginationSelect';
import PaginationInput from '../PaginationInput/PaginationInput';
import { records } from '../../../assets/constants';

import styles from './FilterBoxForTable.module.css';

/**
 * Блок с полем для ввода строки поиска (фильтрации) документов в таблицы и выбора количества документов на странице.
 */
function FilterBoxForTable({
  docsOnPage,
  setDocsOnPage,
  search,
  setSearch,
  placeholder,
  setPage,
  showClearButton,
  localStorageFilterKey,
}) {
  return (
    <div className={styles.block}>
      <PaginationInput
        searchQuery={search}
        setSearchQuery={setSearch}
        placeholder={placeholder}
        setPage={setPage}
        showClearButton={showClearButton}
        localStorageFilterKey={localStorageFilterKey}
      />
      <PaginationSelect
        docsOnPage={docsOnPage}
        setDocsOnPage={setDocsOnPage}
        records={records}
        setPage={setPage}
      />
    </div>
  );
}

export default FilterBoxForTable;
