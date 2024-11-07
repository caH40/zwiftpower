import styles from './Checkbox.module.css';

export default function CheckboxRFH({ register, id }) {
  return <input type="checkbox" className={styles.input} {...register} id={id} />;
}
