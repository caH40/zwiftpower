import React from 'react';

import PaginationFirstPages from './PaginationFirstPages';
import PaginationLastPages from './PaginationLastPages';
import PaginationMiddlePages from './PaginationMiddlePages';

function PaginationManyPages({ pages, getClick, page }) {
  const lastPage = pages.length;
  const isMiddlePage = 5 < page && page < lastPage - 4;
  const isLastPage = page > lastPage - 5;

  return (
    <>
      {page < 6 && <PaginationFirstPages pages={pages} getClick={getClick} page={page} />}
      {isLastPage && <PaginationLastPages pages={pages} getClick={getClick} page={page} />}
      {isMiddlePage && <PaginationMiddlePages pages={pages} getClick={getClick} page={page} />}
    </>
  );
}

export default PaginationManyPages;
