// использование modules
export function addClasses(classModule, additionalClasses = '') {
  return additionalClasses
    .split(' ')
    .map((elm) => classModule[elm])
    .join(' ');
}
