export function createCategoryCaption(categoryLabel) {
  const caption = {
    All: 'Общий протокол.',
    APlus: 'Категория A+.',
  };

  return caption[categoryLabel] || `Категория ${categoryLabel}.`;
}
