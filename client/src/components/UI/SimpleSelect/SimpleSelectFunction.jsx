import styles from './SimpleSelect.module.css';

/**
 * Компонент SimpleSelectFunction: отображает выпадающий список (селектор) с возможностью
 * передать функцию для обработки выбора.
 *
 * @param {Object} props - Пропсы компонента
 * @returns {JSX.Element} Выпадающий список с опциями.
 */
function SimpleSelectFunction({ reducer, value, name, disabled, options, closeEmptyOption }) {
  return (
    <>
      {name ? <p className={styles.label__bold}>{name}:</p> : null}

      <div className={styles.wrapper__select}>
        <select
          className={styles.select}
          value={value}
          onChange={(e) => reducer(e.target.value)}
          disabled={disabled}
        >
          {!closeEmptyOption && <option className={styles.option} value=""></option>}
          {options.map((element) => (
            <option className={styles.option} value={element.name} key={element.id}>
              {element.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default SimpleSelectFunction;
