import styles from './SkeletonCardTwitchStream.module.css';

function SkeletonCardStream({ status }) {
  return (
    status === 'loading' && (
      <div className={styles.wrapper}>
        <div className={styles.image} />

        <div className={styles.description}>
          <div className={styles.channel}>
            <div className={styles.channel__string} />
            <div className={styles.channel__image} />
          </div>

          <div className={styles.info}>
            <div className={styles.rider}>
              <div className={styles.rider__img} />
              <div className={styles.rider__name} />
            </div>

            <div className={styles.stats}>
              <div className={styles.stats__string} />
              <div className={styles.stats__string} />
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default SkeletonCardStream;
