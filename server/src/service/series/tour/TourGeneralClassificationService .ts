/**
 * Класс работы с итоговыми результатами всего тура.
 */
export class TourGeneralClassificationService {
  constructor(public seriesId: string) {}

  /**
   * Получение всех итоговых таблиц.
   */
  public get = async () => {};

  /**
   * Пересчет всех итоговых таблиц.
   * Получить данные какие этапы существуют в Туре.
   * Для каждого этапа получить результаты райдеров.
   * Сформировать массив обязательных номеров этапов для генеральной квалификации.
   * Сформировать коллекцию Map, ключ zwiftId, свойство:
   * profileId:number;
   * {
   * category: TCategorySeries;
   * stageOrder:number;
   * durationInMilliseconds:number;
   *
   * }[]
   */
  public update = async () => {
    //
  };
}
