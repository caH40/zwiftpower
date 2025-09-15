import cn from 'classnames';

import styles from './SkeletonTeamMemberCard.module.css';

export function SkeletonTeamMemberCard({ status }) {
  return (
    status === 'loading' && (
      <div className={styles.cardSkeleton}>
        {/* Верхняя часть с изображением */}
        <div className={cn(styles.skeletonImageContainer, styles.skeletonCatClass)}>
          <div className={styles.skeletonImageLogo}></div>

          <div className={styles.skeletonRole}>
            <div className={styles.skeletonRoleText}></div>
          </div>

          <div className={cn(styles.skeletonCategory, styles.skeletonCatClass)}></div>
        </div>

        {/* Нижняя часть карточки */}
        <div className={styles.skeletonInfoContainer}>
          <div className={styles.skeletonNameContainer}>
            <div className={styles.skeletonName}></div>
            <div className={styles.skeletonFlag}></div>
          </div>

          <div className={styles.skeletonParamsContainer}>
            <div className={styles.skeletonParam}>
              <div className={styles.skeletonParamLabel}></div>
              <div className={styles.skeletonParamValue}></div>
            </div>
            <div className={styles.skeletonParam}>
              <div className={styles.skeletonParamLabel}></div>
              <div className={styles.skeletonParamValue}></div>
            </div>
            <div className={styles.skeletonParam}>
              <div className={styles.skeletonParamLabel}></div>
              <div className={styles.skeletonParamValue}></div>
            </div>
          </div>

          <div className={styles.skeletonSpecContainer}>
            <div className={styles.skeletonSpecLabel}></div>
            <div className={styles.skeletonSpecValue}></div>
          </div>

          <div className={styles.skeletonStatsContainer}>
            <div className={styles.skeletonStat}>
              <div className={styles.skeletonStatIcon}></div>
              <div className={styles.skeletonStatValue}></div>
            </div>
            <div className={styles.skeletonStat}>
              <div className={styles.skeletonStatIcon}></div>
              <div className={styles.skeletonStatValue}></div>
            </div>
          </div>

          <div className={styles.skeletonEventsContainer}>
            <div className={styles.skeletonEventLabel}></div>
            <div className={styles.skeletonEventValue}></div>
          </div>
        </div>
      </div>
    )
  );
}
