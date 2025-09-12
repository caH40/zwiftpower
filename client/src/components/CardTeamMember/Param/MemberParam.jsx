import styles from './Param.module.css';

/**
 * Параметры райдера.
 */
export default function MemberParam({ label, value }) {
  return (
    <div className={styles.container}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}
