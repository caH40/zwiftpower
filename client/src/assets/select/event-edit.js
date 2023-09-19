// опции для селекта с переводом значений в форме редактирования параметров заезда в Звифте
export const optionsCulling = [
  {
    id: 0,
    name: 'CULLING_SUBGROUP_ONLY',
    translate: 'Видны райдеры из одной группы',
  },
  { id: 1, name: 'CULLING_EVENT_ONLY', translate: 'Видны все райдеры заезда' },
  { id: 2, name: 'CULLING_EVERYBODY', translate: 'CULLING_EVERYBODY' },
];
export const optionPrivate = [
  {
    id: 0,
    name: 'DEFINED_BY_RESOURCE_ID',
    translate: 'Могут участвовать только райдеры из клуба',
  },
  { id: 1, name: 'SHAREABLE', translate: 'Могут участвовать все райдеры' },
  { id: 2, name: 'PUBLIC', translate: 'Публичный (ошибка при выборе!)' },
];

export const optionsEventType = [
  { id: 0, name: 'GROUP_RIDE', translate: 'Свободный заезд' },
  { id: 1, name: 'RACE', translate: 'Гонка' },
  { id: 2, name: 'TIME_TRIAL', translate: 'Гонка с раздельным стартом' },
];
