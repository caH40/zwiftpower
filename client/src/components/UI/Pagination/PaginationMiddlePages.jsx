import React from 'react';
import cn from 'classnames';

import styles from './Pagination.module.css';

function PaginationMiddlePages({ pages, getClick, page }) {
  const lastPage = pages.length;

  return (
    <>
      <li className={styles.item} onClick={() => getClick(1)}>
        1
      </li>
      <li className={styles.item}>...</li>
      {pages.slice(page - 2, page + 1).map((pageCurrent) => (
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

export default PaginationMiddlePages;

// отображение строки пагинации для страницы по середине списка
