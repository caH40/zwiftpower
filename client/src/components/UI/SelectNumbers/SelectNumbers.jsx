import styles from './SelectNumbers.module.css';

/**
 * Селект элементы которого являются числа.
 */
export default function SelectNumbers({ options, propsOption, ...propsSelect }) {
  return (
    <select className={styles.select} {...propsSelect}>
      {options.map((elm) => (
        <option key={elm} id={elm} className={styles.option}>
          {elm}
        </option>
      ))}
    </select>
  );
}
