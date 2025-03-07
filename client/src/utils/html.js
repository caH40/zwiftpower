/**
 * Форматирование обычного текста в HTML
 */
export const createHtml = {
  // форматирование текса описания
  description: function (text) {
    if (!text) {
      return '';
    }
    const htmlWithLink = this.replaceWithUrl(text);
    return this.replaceWithBr(htmlWithLink);
  },

  // замена перевода строки \n на Тэг <br>
  replaceWithBr: function (text = '') {
    return text.replace(/\n/g, '<br />');
  },

  // замена url на Тэг <a> с соответствующим url
  replaceWithUrl: function (text) {
    return text.replace(
      /((http|https):\/\/[^\s]+)/g,
      '<a class="link" target="_blank" rel="noreferrer" href="$1">$1</a>'
    );
  },
};
