import React from 'react';
import cn from 'classnames';

import styles from './Pagination.module.css';
import PaginationManyPages from './PaginationManyPages';

const Pagination = ({ quantityPages, page, setPage }) => {
  const pages = Array(quantityPages)
    .fill('')
    .map((_, index) => index + 1);

  const getClick = (item) => {
    if (item === '<<' && page !== 1) {
      setPage((prev) => prev - 1);
      return;
    }
    if (item === '>>' && page !== quantityPages && quantityPages !== 1) {
      setPage((prev) => prev + 1);
      return;
    }
    if (item === '>>' && quantityPages === page) return;
    if (item === '<<' && page === 1) return;

    setPage(item);
  };

  return (
    <nav className={styles.navigation}>
      <ul className={styles.list}>
        <li className={styles.item} onClick={() => getClick('<<')}>
          {'<<'}
        </li>
        {/* если страниц больше 7 то изменяется строка пагинации */}
        {pages.length > 7 ? (
          <PaginationManyPages pages={pages} page={page} getClick={getClick} />
        ) : (
          pages.map((pageCurrent) => (
            <li
              className={cn(styles.item, { [styles.active]: page === pageCurrent })}
              onClick={() => getClick(pageCurrent)}
              key={pageCurrent}
            >
              {pageCurrent}
            </li>
          ))
        )}

        <li className={styles.item} onClick={() => getClick('>>')}>
          {'>>'}
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
