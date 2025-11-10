// types
import { TResponseService } from '../../types/http.interface.js';

// Абстрактный класс для всех классов управления генеральной классификации.
export abstract class AbstractBaseGCManager {
  constructor(protected seriesId: string) {}

  abstract update(): Promise<TResponseService<null>>;
}

// Класс заглушка.
export class EmptyGCManager extends AbstractBaseGCManager {
  async update(): Promise<TResponseService<null>> {
    return {
      data: null,
      message: `⚠️ Функционал для запрашиваемого типа серии (${this.seriesId}) отсутствует`,
    };
  }
}
