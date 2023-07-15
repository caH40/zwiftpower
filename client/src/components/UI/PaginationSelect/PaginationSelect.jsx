import React from 'react';

import styles from './PaginationSelect.module.css';

function PaginationSelect({ docsOnPage, setDocsOnPage, records }) {
  return (
    <>
      <select
        value={docsOnPage}
        className={styles.select}
        onChange={(e) => {
          setDocsOnPage(e.target.value);
        }}
      >
        {records.map((record) => (
          <option value={record.value} label={record.value} key={record.id} />
        ))}
      </select>
    </>
  );
}

export default PaginationSelect;
