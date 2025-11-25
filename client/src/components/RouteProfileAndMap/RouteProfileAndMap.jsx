import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAssetsRoute } from '../../redux/features/api/assets/fetchAssets';

import styles from './RouteProfileAndMap.module.css';

/**
 * Отображение профиля и карты маршрута
 * @param {{routeId:number}} routeId id маршрута в ZwiftAPI,
 * берется из данных подгруппы с индексом "0", как правило первая по старшинству группа
 *
 */
function RouteProfileAndMap({ routeId }) {
  const { routes } = useSelector((state) => state.assets);

  const [hasImage, setHasImage] = useState(true);
  const dispatch = useDispatch();

  const route = routes[routeId];
  const routeName = route?.name ?? '';
  const routeMapImageUrl = route?.imageUrl;
  const routeProfileImageUrl = `/images/zwift/routes/zwifthub/${routeId}.webp`;

  useEffect(() => {
    dispatch(fetchAssetsRoute({ routeIds: [routeId] }));
  }, [routeId, dispatch]);

  return (
    <div className={styles.block}>
      {hasImage && (
        <div className={styles.profile}>
          <h3 className={styles.title}>{`Профиль ${routeName}`}</h3>
          <img
            onError={() => setHasImage(false)}
            src={routeProfileImageUrl}
            alt={`Профиль ${routeName}`}
          />
          <div className={styles.origin}>
            <span>Route profile by </span>
            <a
              className={styles.link}
              href="https://zwifthub.com"
              target="_blank"
              rel="noreferrer"
            >
              ZwiftHub
            </a>
          </div>
        </div>
      )}

      <div className={styles.map}>
        <h3 className={styles.title}>{`Карта ${routeName}`}</h3>
        <img src={routeMapImageUrl} alt={`Карта ${routeName}`} />
      </div>
    </div>
  );
}

export default RouteProfileAndMap;
