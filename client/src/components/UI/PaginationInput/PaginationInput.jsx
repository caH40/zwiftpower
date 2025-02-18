import IconDelete from '../../icons/IconDelete';

import styles from './PaginationInput.module.css';

/**
 * Поле ввода для фильтрации документов по вводимому слову.
 *
 * @param {Object} props
 * @param {string} props.searchQuery - Текущий поисковый запрос.
 * @param {function} props.setSearchQuery - Функция для обновления поискового запроса.
 * @param {string} props.placeholder - Текст placeholder для input.
 * @param {function} props.setPage - Функция для установки текущей страницы (сбрасывает на 1 при изменении запроса).
 * @param {boolean} props.showClearButton - Флаг, отображающий кнопку очистки.
 * @param {string} [props.localStorageKey] - Ключ для сохранения поискового запроса в localStorage.
 */
function PaginationInput({
  searchQuery,
  setSearchQuery,
  placeholder,
  setPage,
  showClearButton,
  localStorageKey,
}) {
  // Очищает поле поиска и, если задан ключ, сбрасывает значение в localStorage.
  const handleClearSearch = () => {
    setSearchQuery('');

    if (localStorageKey) {
      localStorage.setItem(localStorageKey, '');
    }
  };

  return (
    <div className={styles.wrapper}>
      <input
        value={searchQuery}
        className={styles.input}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setPage(1); // Сбрасываем страницу при изменении поискового запроса.
        }}
        placeholder={placeholder}
      />

      {showClearButton && (
        <div className={styles.box__icon}>
          <IconDelete
            getClick={handleClearSearch}
            squareSize={16}
            color={searchQuery ? undefined : '#444444'}
          />
        </div>
      )}
    </div>
  );
}

export default PaginationInput;
