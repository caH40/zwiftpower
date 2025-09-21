import styles from './LoadingPage.module.css';

export function LoadingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>Загрузка...</p>
    </div>
  );
}
