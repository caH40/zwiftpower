import React from 'react';

import styles from './PaginationInput.module.css';

function PaginationInput({ search, setSearch, placeholder, setPage }) {
  return (
    <input
      value={search}
      className={styles.input}
      onChange={(e) => {
        setSearch(e.target.value);
        setPage(1);
      }}
      placeholder={placeholder}
    />
  );
}

export default PaginationInput;
