import { routes } from '../assets/zwift/lib/cjs/routes.js';
import { TResponseService } from '../types/http.interface.js';

/**
 * Сервис получения данных из текстовых библиотек.
 */
export class AssetsService {
  getRoute = async (id: number): Promise<TResponseService<unknown>> => {
    const route = routes.find((r) => r.id === id);

    if (!route) {
      throw new Error(`Маршрут с id: ${id} не найден!`);
    }

    return { data: route, message: `Данные маршрута с id: ${id}` };
  };
}
