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
      name: config.name,
      translate: config.displayName,
    }));
  };
}
