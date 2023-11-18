import { getLinksRouteDescription } from '../../utils/event';

import styles from './LinksRoute.module.css';
import LinkRouter from './LinkRouter';

function LinksRoute({ routeId }) {
  const { linkZwifterbikes, linkZwiftinsider, linkWhatsonzwift, linkStravaSegment } =
    getLinksRouteDescription(routeId);
  return (
    <div className={styles.block}>
      <LinkRouter
        link={linkZwiftinsider}
        linkFavicon={'https://zwiftinsider.com/wp-content/uploads/2021/11/favicon.png'}
        text={'Описание маршрута на zwiftInsider.com'}
      />
      <LinkRouter
        link={linkWhatsonzwift}
        linkFavicon={'https://whatsonzwift.com/favicon-32x32.png'}
        text={'Описание маршрута на whatsonzwift.com'}
      />
      <LinkRouter
        link={linkStravaSegment}
        linkFavicon={'/images/strava-favicon.png'}
        text={'Сегмент на strava.com'}
      />
      <LinkRouter
        link={linkZwifterbikes}
        linkFavicon={'https://zwifterbikes.web.app/assets/icons/favicon-32x32.png'}
        text={'Выбор велосипеда для маршрута zwifterbikes.web.app'}
      />
    </div>
  );
}

export default LinksRoute;
