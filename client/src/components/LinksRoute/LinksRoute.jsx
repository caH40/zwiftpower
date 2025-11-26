import { useRaceRoute } from '../../hook/useRaceRoute';

import styles from './LinksRoute.module.css';
import LinkRouter from './LinkRouter';

function LinksRoute({ routeId }) {
  const routes = useRaceRoute([routeId]);

  const { zwifterBikesUrl, zwiftInsiderUrl, whatsOnZwiftUrl, stravaSegmentUrl } =
    routes[routeId] || {};
  return (
    <div className={styles.block}>
      <LinkRouter
        link={zwiftInsiderUrl}
        linkFavicon={'https://zwiftinsider.com/wp-content/uploads/2021/11/favicon.png'}
        text={'Описание маршрута на zwiftInsider.com'}
      />
      <LinkRouter
        link={whatsOnZwiftUrl}
        linkFavicon={'https://whatsonzwift.com/favicon-32x32.png'}
        text={'Описание маршрута на whatsonzwift.com'}
      />
      <LinkRouter
        link={stravaSegmentUrl}
        linkFavicon={'/images/strava-favicon.png'}
        text={'Сегмент на strava.com'}
      />
      <LinkRouter
        link={zwifterBikesUrl}
        linkFavicon={'https://zwifterbikes.web.app/assets/icons/favicon-32x32.png'}
        text={'Выбор велосипеда для маршрута zwifterbikes.web.app'}
      />
    </div>
  );
}

export default LinksRoute;
