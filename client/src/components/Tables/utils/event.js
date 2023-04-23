import { worlds } from '../../../asset/zwift/lib/esm/worlds';
import { routes } from '../../../asset/zwift/lib/esm/routes';

export function map(id) {
  return worlds.find((map) => map.id === id)?.name;
}
export function route(id) {
  return routes.find((route) => route.id === id)?.name;
}
