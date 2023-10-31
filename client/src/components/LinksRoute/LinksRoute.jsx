import { getLinksRouteDescription } from '../../utils/event';

import styles from './LinksRoute.module.css';

function LinksRoute({ routeId }) {
  const { linkZwifterbikes, linkZwiftinsider, linkWhatsonzwift } =
    getLinksRouteDescription(routeId);
  return (
    <div className={styles.block}>
      {linkZwiftinsider && (
        <p className={styles.route__p}>
          <a className={styles.link} href={linkZwiftinsider} target="_blank" rel="noreferrer">
            Описание маршрута на zwiftInsider.com
          </a>
        </p>
      )}
      {linkWhatsonzwift && (
        <p className={styles.route__p}>
          <a className={styles.link} href={linkWhatsonzwift} target="_blank" rel="noreferrer">
            Описание маршрута на whatsonzwift.com
          </a>
        </p>
      )}
      {/* 
      {stravaSegmentUrl && (
        <p className={styles.route__p}>
          <a className={styles.link} href={stravaSegmentUrl} target="_blank" rel="noreferrer">
            Сегмент на strava.com
          </a>
        </p>
      )}{' '}
     */}
      {linkZwifterbikes && (
        <p className={styles.route__p}>
          <a className={styles.link} href={linkZwifterbikes} target="_blank" rel="noreferrer">
            Выбор велосипеда для маршрута zwifterbikes.web.app
          </a>
        </p>
      )}
    </div>
  );
}

export default LinksRoute;
