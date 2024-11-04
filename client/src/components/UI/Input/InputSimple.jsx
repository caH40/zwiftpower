import styles from '../ReduxUI/RInput/RInput.module.css';

export default function InputSimple({ label, type, value, setValue, disabled }) {
  return (
    <>
      <label className={styles.label}>
        {label}
        <input
          className={styles.input}
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
        />
      </label>
    </>
  );
}
