import React from 'react';
import cn from 'classnames';

import styles from './Pagination.module.css';

function PaginationLastPages({ pages, getClick, page }) {
  const lastPage = pages.length;

  return (
    <>
      <li className={styles.item} onClick={() => getClick(1)}>
        1
      </li>
      <li className={styles.item}>...</li>
      {pages.slice(lastPage - 5).map((pageCurrent) => (
        <li
          className={cn(styles.item, { [styles.active]: page === pageCurrent })}
          onClick={() => getClick(pageCurrent)}
          key={pageCurrent}
        >
          {pageCurrent}
        </li>
      ))}
    </>
  );
}

export default PaginationLastPages;

// отображение строки пагинации для страницы в конце списка
