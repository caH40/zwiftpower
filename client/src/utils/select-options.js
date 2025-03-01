/**
 * Класс для формирования списка опций для тэга select на основе данных из БД.
 */
export class SelectOption {
  constructor() {}

  /**
   * Формирует список опций для конфигураций финишного протокола.
   * @param {Array<Object>} configsFP - Массив объектов конфигураций финишного протокола.
   * @returns {Array<Object>} - Массив объектов для опций тэга select.
   */
  configsFinishProtocol = (configsFP) => {
    return configsFP.map((config) => ({
      id: config._id,
      value: config.name,
      label: config.name,
      translate: config.displayName,
    }));
  };

  // /**
  //  * Формирует список опций для организаторов.
  //  * @param {Array<Object>} organizers - Массив объектов организаторов.
  //  * @returns {Array<Object>} - Массив объектов для опций тэга select.
  //  */
  // organizers = (organizers) => {
  //   return organizers.map((organizer) => ({
  //     value: organizer.id,
  //     label: organizer.name,
  //   }));
  // };
}
