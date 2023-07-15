import React from 'react';

import styles from './PaginationInput.module.css';

function PaginationInput({ search, setSearch, placeholder }) {
  return (
    <input
      value={search}
      className={styles.input}
      onChange={(e) => {
        setSearch(e.target.value);
      }}
      placeholder={placeholder}
    />
  );
}

export default PaginationInput;
