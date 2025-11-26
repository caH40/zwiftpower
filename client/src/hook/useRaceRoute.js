import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAssetsRoutes } from '../redux/features/api/assets/fetchAssets';

export function useRaceRoute(routeIds) {
  const { routes } = useSelector((state) => state.assets);
  const dispatch = useDispatch();

  const routeIdsStr = JSON.stringify(routeIds);

  useEffect(() => {
    const ids = JSON.parse(routeIdsStr);
    dispatch(fetchAssetsRoutes({ routeIds: ids }));
  }, [routeIdsStr, dispatch]);

  return routes;
}
