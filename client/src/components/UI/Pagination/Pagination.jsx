import React from 'react';
import cn from 'classnames';

import styles from './Pagination.module.css';

const Pagination = ({ quantityPages, page, setPage }) => {
  const pages = Array(quantityPages).fill('');

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
        {pages.map((_, index) => (
          <li
            className={cn(styles.item, { [styles.active]: page === index + 1 })}
            onClick={() => getClick(index + 1)}
            key={index + 1}
          >
            {index + 1}
          </li>
        ))}
        <li className={styles.item} onClick={() => getClick('>>')}>
          {'>>'}
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
