/**
 * Отображение полного названия, выбранного селектора
 */
export const getNameSelected = (options = [], nameCurrent) => {
  const { translate, name } = options.find((option) => option.name === nameCurrent) || {
    name: nameCurrent,
    translate: nameCurrent,
  };
  return translate || name;
};
