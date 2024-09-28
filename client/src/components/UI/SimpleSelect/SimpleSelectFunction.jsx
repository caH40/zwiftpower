import styles from './SimpleSelect.module.css';

/**
 * Select при изменении option запускается передаваемая функция
 * options =[name: значение(value), label: отображаемое название в селекторе, id: любой id]
 */
function SimpleSelectFunction({
  reducer,
  value,
  name,
  disabled,
  options,
  closeEmptyOption,
  defaultValue,
}) {
  return (
    <>
      {name ? <p className={styles.label__bold}>{name}:</p> : null}
      <select
        className={styles.select}
        placeholder={name}
        value={value}
        // value={''}
        onChange={(e) => reducer(e.target.value)}
        disabled={disabled}
        defaultValue={defaultValue}
      >
        {!closeEmptyOption && <option className={styles.option} value=""></option>}
        {options.map((element) => (
          <option className={styles.option} value={element.name} key={element.id}>
            {element.label}
          </option>
        ))}
      </select>
    </>
  );
}

export default SimpleSelectFunction;
