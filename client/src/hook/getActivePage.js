/**
 * Определение активной страницы согласно активной кнопки в навигации
 * @param {string} pathname // url страницы
 * @param {string} page // адрес страницы получаемый из активной кнопки
 * @param {string} notNestedPath // адрес (уникальное слово) который не содержит вложенных страниц
 * @param {string} nestedPath // адрес (уникальное слово) который содержит вложенные страницы
 * @returns {boolean} is active page or not
 */

export const getActivePage = (pathname, page, notNestedPath, nestedPath) => {
  // данный блок для страниц в pathname которых нет 'main'
  if (
    page.includes(nestedPath) &&
    !pathname.includes(notNestedPath) &&
    !pathname.includes('ftp') &&
    !pathname.includes('riders-racing-score')
  ) {
    // если в pathname есть
    return true;
  }

  if (pathname.includes(page)) {
    return true;
  } else {
    return false;
  }
};
