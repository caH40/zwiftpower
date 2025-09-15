import styles from './SkeletonSeriesHeader.module.css';

export default function SkeletonSeriesHeader({ status }) {
  return (
    status === 'loading' && (
      <section className={styles.wrapper}>
        <div className={styles.title} />

        <div className={styles.mission__box}>
          <div className={styles.mission}></div>
        </div>
      </section>
    )
  );
}
