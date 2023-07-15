import React from 'react';

import styles from './PaginationSelect.module.css';

const records = [
  { id: 0, value: 5 },
  { id: 1, value: 10 },
  { id: 2, value: 15 },
  { id: 3, value: 20 },
  { id: 4, value: 25 },
  { id: 5, value: 50 },
];

function PaginationSelect({ docsOnPage, setDocsOnPage }) {
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
