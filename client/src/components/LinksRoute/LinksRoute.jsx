import React from 'react';

import { routeLinks } from '../../utils/event';

import styles from './LinksRoute.module.css';

function LinksRoute({ routeId }) {
  const { whatsOnZwiftUrl, zwiftInsiderUrl, stravaSegmentUrl } = routeLinks(routeId);
  return (
    <div className={styles.block}>
      {zwiftInsiderUrl && (
        <p className={styles.route__p}>
          <a className={styles.link} href={zwiftInsiderUrl} target="_blank" rel="noreferrer">
            Описание маршрута на zwiftInsider.com
          </a>
        </p>
      )}
      {whatsOnZwiftUrl && (
        <p className={styles.route__p}>
          <a className={styles.link} href={whatsOnZwiftUrl} target="_blank" rel="noreferrer">
            Описание маршрута на whatsonzwift.com
          </a>
        </p>
      )}
      {stravaSegmentUrl && (
        <p className={styles.route__p}>
          <a className={styles.link} href={stravaSegmentUrl} target="_blank" rel="noreferrer">
            Сегмент на strava.com
          </a>
        </p>
      )}
    </div>
  );
}

export default LinksRoute;
