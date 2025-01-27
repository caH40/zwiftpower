import styles from './Checkbox.module.css';

/**
 * RFH - React Form Hook
 */
export default function CheckboxRFH({ register, id, loading }) {
  return (
    <input type="checkbox" className={styles.input} {...register} id={id} disabled={loading} />
  );
}
