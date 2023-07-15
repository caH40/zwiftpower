import React from 'react';

import PaginationSelect from '../PaginationSelect/PaginationSelect';
import PaginationInput from '../PaginationInput/PaginationInput';

import styles from './FilterBoxResultsList.module.css';

const records = [
  { id: 0, value: 5 },
  { id: 1, value: 10 },
  { id: 2, value: 15 },
  { id: 3, value: 20 },
  { id: 4, value: 25 },
  { id: 5, value: 50 },
];

function FilterBoxResultsList({ docsOnPage, setDocsOnPage, search, setSearch }) {
  localStorage.setItem('recordsOnPageResults', docsOnPage);
  return (
    <div className={styles.block}>
      <PaginationInput search={search} setSearch={setSearch} />
      <PaginationSelect
        docsOnPage={docsOnPage}
        setDocsOnPage={setDocsOnPage}
        records={records}
      />
    </div>
  );
}

export default FilterBoxResultsList;
