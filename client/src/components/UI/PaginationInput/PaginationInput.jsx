import React from 'react';

import styles from './PaginationInput.module.css';

function PaginationInput({ search, setSearch }) {
  return (
    <input
      value={search}
      className={styles.input}
      onChange={(e) => {
        setSearch(e.target.value);
      }}
      placeholder="поиск по названию"
    />
  );
}

export default PaginationInput;
