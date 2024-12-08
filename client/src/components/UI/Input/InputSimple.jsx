import IconQuestion from '../../icons/IconQuestion';

import styles from './InputSimple.module.css';

export default function InputSimple({
  label,
  type,
  value,
  setValue,
  disabled,
  validationText,
  id,
  description,
  ...props
}) {
  return (
    <>
      <label className={styles.label} htmlFor={id}>
        <span className={styles.label__text}>
          {label} {description && <IconQuestion squareSize={16} tooltip={description} />}
        </span>
        <span className={styles.error}>{validationText}</span>
      </label>

      <input
        className={styles.input}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        id={id}
        {...props}
      />
    </>
  );
}
