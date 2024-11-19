import styles from './Checkbox.module.css';

/**
 * RFH - React Form Hook
 */
export default function CheckboxRFH({ register, id }) {
  return <input type="checkbox" className={styles.input} {...register} id={id} />;
}
