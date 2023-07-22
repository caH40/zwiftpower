// формирование классов css из проброшенных пропсов
export function addClasses(classModule, additionalClasses = '') {
  return additionalClasses
    .split(' ')
    .map((elm) => classModule[elm])
    .join(' ');
}
