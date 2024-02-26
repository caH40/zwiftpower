// types
import { DocsAfterPagination } from '../types/types.interface.js';

/**
 * Получение страницы page из массива документов documents,
 * когда на фронтенде отображается docsOnPage документов на странице
 */
export const getCurrentDocsOnPage = <T>(
  documents: Array<T>,
  page: number,
  docsOnPage: number
): DocsAfterPagination<T> => {
  let currentPage = page;
  // общее количество страниц с документами
  const quantityPages = Math.ceil(documents.length / docsOnPage);

  // если запрашиваемая страница page больше количество страниц quantityPages
  if (quantityPages - page < 0) {
    currentPage = quantityPages;
  }

  const sliceStart = currentPage * docsOnPage - docsOnPage;
  const sliceEnd = docsOnPage * currentPage;
  const documentsSliced = documents.slice(sliceStart, sliceEnd);

  return { currentDocs: documentsSliced, currentPage, quantityPages };
};
