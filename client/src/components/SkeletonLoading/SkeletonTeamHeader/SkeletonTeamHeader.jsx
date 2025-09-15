import styles from './SkeletonTeamHeader.module.css';

export function SkeletonTeamHeader({ status }) {
  return (
    status === 'loading' && (
      <section className={styles.wrapper}>
        <div className={styles.poster}>
          <div className={styles.poster__placeholder}></div>

          <div className={styles.poster__img}></div>

          <div className={styles.content}>
            <div className={styles.logo}></div>

            <div className={styles.title}></div>

            <div className={styles.content__bottom}>
              <div className={styles.buttons__block}></div>

              <div className={styles.mission__box}>
                <div className={styles.mission}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
}
