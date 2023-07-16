import React from 'react';
import cn from 'classnames';

import styles from './Pagination.module.css';

function PaginationFirstPages({ pages, getClick, page }) {
  const lastPage = pages.length;

  return (
    <>
      {pages.slice(0, 5).map((pageCurrent) => (
        <li
          className={cn(styles.item, { [styles.active]: page === pageCurrent })}
          onClick={() => getClick(pageCurrent)}
          key={pageCurrent}
        >
          {pageCurrent}
        </li>
      ))}
      <li className={styles.item}>...</li>
      <li className={styles.item} onClick={() => getClick(lastPage)}>
        {lastPage}
      </li>
    </>
  );
}

export default PaginationFirstPages;

// отображение строки пагинации для страницы в начале списка
