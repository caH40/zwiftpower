import { EnduranceGC } from './endurance/EnduranceGC.js';
import { AbstractBaseGCManager, EmptyGCManager } from './AbstractBaseGC.js';
import { TourGCManager } from './tour/TourGCManager.js';

// types
import { TSeriesType } from '../../types/model.interface.js';

type GCManagerConstructor = new (seriesId: string) => AbstractBaseGCManager;

export class GCProviderFactory {
  private handlers: Map<TSeriesType, GCManagerConstructor>;

  constructor(private seriesId: string) {
    this.handlers = new Map([
      ['endurance', EnduranceGC],
      ['tour', TourGCManager],
      ['catchUp', EmptyGCManager],
      ['criterium', EmptyGCManager],
      ['series', EmptyGCManager],
    ]);
  }

  getHandler = <T extends TSeriesType>(seriesType: T): AbstractBaseGCManager => {
    const HandlerClass = this.handlers.get(seriesType);

    if (!HandlerClass) {
      throw new Error(`Не найден обработчик для серии типа: ${seriesType}`);
    }

    return new HandlerClass(this.seriesId);
  };
}
