import { AbstractBaseGCManager } from '../AbstractBaseGC.js';

/**
 * Класс работы с генеральной классификацией серии типа Endurance.
 */
export class EnduranceGC extends AbstractBaseGCManager {
  constructor(public seriesId: string) {
    super(seriesId);
  }

  update = async () => {
    return {
      data: null,
      message: `Обновлена (создана) генеральная классификация серии заездов "${'seriesDB.name'}"`,
    };
  };
}
