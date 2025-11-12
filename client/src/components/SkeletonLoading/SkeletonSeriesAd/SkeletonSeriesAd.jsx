import styles from './SkeletonSeriesAd.module.css';

export default function SkeletonSeriesAd({ status }) {
  return status === 'loading' ? (
    <div className={styles.wrapper} height={220}>
      <div className={styles.box__titles}></div>

      <div className={styles.description}></div>
    </div>
  ) : null;
}
