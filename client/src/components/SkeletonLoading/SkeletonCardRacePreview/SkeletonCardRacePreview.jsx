import { useResize } from '../../../hook/use-resize';

import styles from './SkeletonCardRacePreview.module.css';

function SkeletonCardRacePreview({ status }) {
  const { isScreenSm: sm } = useResize();
  return (
    status === 'loading' && (
      <div className={styles.wrapper}>
        <div className={styles.text} />

        <div className={styles.card}>
          <div className={styles.card__top}>
            {/* текстовое описание */}
            <div className={styles.description}>
              <div>
                <div className={styles.text} />
                <div className={styles.text} />
              </div>

              {sm && (
                <div>
                  <div className={styles.text} />
                  <div className={styles.text} />
                  <div className={styles.text} />
                </div>
              )}
            </div>

            {/* постер */}
            <div className={styles.poster}></div>
          </div>

          <div className={styles.card__bottom}></div>
        </div>
      </div>
    )
  );
}

export default SkeletonCardRacePreview;
