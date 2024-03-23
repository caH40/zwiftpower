import PaginationSelect from '../PaginationSelect/PaginationSelect';
import PaginationInput from '../PaginationInput/PaginationInput';
import { records } from '../../../assets/constants';

import styles from './FilterBoxForTable.module.css';

function FilterBoxForTable({
  docsOnPage,
  setDocsOnPage,
  search,
  setSearch,
  placeholder,
  setPage,
}) {
  return (
    <div className={styles.block}>
      <PaginationInput
        search={search}
        setSearch={setSearch}
        placeholder={placeholder}
        setPage={setPage}
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
