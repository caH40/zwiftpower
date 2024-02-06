import styles from './SimpleInput.module.css';

/**
 * Универсальный Input, state является примитивом
 * @param {*} param0
 */
function CommonInput({ name, state, setState, placeholder, type, disabled, value, ...props }) {
  return (
    <>
      {name ? <label className={styles.label}>{name}:</label> : undefined}
      <input
        className={styles.input}
        placeholder={placeholder}
        type={type}
        value={state}
        onChange={(e) => setState(e.target.value)}
        disabled={disabled}
        {...props}
      />
    </>
  );
}

export default CommonInput;
