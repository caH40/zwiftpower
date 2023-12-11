import { useEffect } from 'react';

/**
 * если page больше чем общее количество страниц,
 * то текущая страница равна общему количеству страниц, то есть последней
 * такой случай возможен, отображается последняя страница и после удаления логов
 * количество страниц уменьшается, то то есть  quantityPages < page
 */
export function useLastPage(setPage, quantityPages, pageFromServer, page) {
  useEffect(() => {
    if (quantityPages >= page) {
      return;
    }
    setPage(pageFromServer);
  }, [quantityPages, pageFromServer, page]);
}
