import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAssetsRoute } from '../redux/features/api/assets/fetchAssets';

export function useRaceRoute(routeIds) {
  const { routes } = useSelector((state) => state.assets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAssetsRoute({ routeIds }));
  }, [routeIds, dispatch]);

  return routes;
}
