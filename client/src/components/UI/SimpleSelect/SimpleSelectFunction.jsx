import styles from './SimpleSelect.module.css';

/**
 * Select при изменении option запускается передаваемая функция
 */
function SimpleSelectFunction({ reducer, name, disabled, options, closeEmptyOption }) {
  return (
    <>
      {name ? <p className={styles.label}>{name}:</p> : null}
      <select
        className={styles.select}
        placeholder={name}
        onChange={(e) => reducer(e.target.value)}
        disabled={disabled}
      >
        {!closeEmptyOption && <option className={styles.option} value=""></option>}
        {options.map((element) => (
          <option className={styles.option} value={element.name} key={element.id}>
            {element.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default SimpleSelectFunction;
