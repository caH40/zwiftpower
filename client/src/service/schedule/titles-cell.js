export function getCellTitle(keys, sheet, title) {
  try {
    for (let i = 0; i < keys.length; i++) {
      if (sheet[keys[i]].v === title) {
        const cellTitle = keys[i];
        return cellTitle;
      }
    }
    return false;
  } catch (error) {
    console.log(error); // eslint-disable-line
    throw error;
  }
}
