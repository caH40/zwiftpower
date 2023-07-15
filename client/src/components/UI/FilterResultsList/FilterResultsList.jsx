import React from 'react';

import PaginationSelect from '../PaginationSelect/PaginationSelect';

import styles from './FilterResultsList.module.css';

function FilterResultsList({ docsOnPage, setDocsOnPage }) {
  localStorage.setItem('recordsOnPageResults', docsOnPage);
  return (
    <div className={styles.block}>
      <PaginationSelect docsOnPage={docsOnPage} setDocsOnPage={setDocsOnPage} />
    </div>
  );
}

export default FilterResultsList;
