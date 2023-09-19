import { routes } from '../asset/zwift/lib/esm/routes.js';

/**
 * Зачем она нужна???
 * ссылка на страницу zwiftInsider описания маршрута
 */

export function getZwiftInsiderUrl(routeId: number) {
  return routes.find((route) => route.id === routeId)?.zwiftInsiderUrl;
}
