import { routes } from '../assets/zwift/lib/cjs/routes.js';
import { TResponseService } from '../types/http.interface.js';

/**
 * Сервис получения данных из текстовых библиотек.
 */
export class AssetsService {
  getRoutes = async (ids: number[]): Promise<TResponseService<unknown[]>> => {
    const currentRoutes = routes.filter((r) => r.id && !isNaN(+r.id) && ids.includes(+r.id));

    if (currentRoutes.length === 0) {
      throw new Error(`Маршруты с ids: ${ids} не найдены!`);
    }

    return { data: currentRoutes, message: `Данные маршрутов с ids: ${ids}` };
  };
}
