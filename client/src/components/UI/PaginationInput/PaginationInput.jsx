import IconDelete from '../../icons/IconDelete';

import styles from './PaginationInput.module.css';

/**
 * Поле ввода для фильтрации документов по вводимому слову.
 */
function PaginationInput({ search, setSearch, placeholder, setPage, hasClearButton }) {
  return (
    <div className={styles.wrapper}>
      <input
        value={search}
        className={styles.input}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        placeholder={placeholder}
      />

      {hasClearButton && (
        <div className={styles.box__icon}>
          <IconDelete
            getClick={() => setSearch('')}
            squareSize={16}
            color={search ? undefined : '#444444'}
          />
        </div>
      )}
    </div>
  );
}

export default PaginationInput;
