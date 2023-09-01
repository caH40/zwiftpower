import { routes } from '../asset/zwift/lib/esm/routes.js';

export function getZwiftInsiderUrl(routeId) {
  return routes.find((route) => route.id === routeId)?.zwiftInsiderUrl;
}
