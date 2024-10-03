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
      {/* Отображение метки, если передан проп name */}
      <select
        className={styles.select} // Стили для селектора
        value={value} // Текущее значение, управляемое извне
        onChange={(e) => reducer(e.target.value)} // Вызов reducer при изменении значения
        disabled={disabled} // Если true, отключает селектор
      >
        {/* Если closeEmptyOption не установлен, добавляется пустая опция */}
        {!closeEmptyOption && <option className={styles.option} value=""></option>}
        {/* Генерация опций на основе переданного массива options */}
        {options.map((element) => (
          <option
            className={styles.option} // Стили для опций
            value={element.name} // Значение опции
            key={element.id} // Уникальный ключ для каждой опции
          >
            {element.label} {/* Отображаемый текст опции */}
          </option>
        ))}
      </select>
    </>
  );
}

export default SimpleSelectFunction;
