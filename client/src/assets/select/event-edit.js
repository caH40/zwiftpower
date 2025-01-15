// опции для селекта с переводом значений в форме редактирования параметров заезда в Звифте
export const optionsCulling = [
  {
    id: 0,
    name: 'CULLING_SUBGROUP_ONLY',
    translate: 'Видны райдеры из одной группы',
  },
  { id: 1, name: 'CULLING_EVENT_ONLY', translate: 'Видны все райдеры заезда' },
  { id: 2, name: 'CULLING_EVERYBODY', translate: 'Видны все райдеры на данной карте' },
];
export const optionPrivate = [
  {
    id: 0,
    name: 'DEFINED_BY_RESOURCE_ID',
    translate: 'Могут участвовать только райдеры из клуба',
  },
  { id: 1, name: 'SHAREABLE', translate: 'Могут участвовать все райдеры' },
  { id: 2, name: 'PUBLIC', translate: 'Публичный' },
];

/**
 * nameSecond для свойства type в объекте параметров Эвена Zwift
 */
export const optionsEventType = [
  {
    id: 0,
    name: 'GROUP_RIDE',
    nameSecond: 'EVENT_TYPE_GROUP_RIDE',
    translate: 'Свободный заезд (Ride)',
    title: 'GROUP RIDE',
  },
  {
    id: 1,
    name: 'RACE',
    nameSecond: 'EVENT_TYPE_RACE',
    translate: 'Гонка (Race)',
    title: 'RACE',
  },
  {
    id: 2,
    name: 'TIME_TRIAL',
    nameSecond: 'EVENT_TYPE_TIME_TRIAL',
    translate: 'Гонка с раздельным стартом (TT)',
    title: 'TIME TRIAL',
  },
];
