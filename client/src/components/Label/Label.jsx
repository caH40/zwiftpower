import styles from './Label.module.css';

export default function Label({ children, label, ...props }) {
  return (
    <label className={styles.wrapper} {...props}>
      <span className={styles.label}>{label}</span>
      {children}
    </label>
  );
}
