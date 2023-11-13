/**
 * Преобразование возраста из лет в возрастную категорию
 * @param {number} age возраст полных лет
 * @returns {string} возрастная категория
 */
export const getAgeCategory = (age) => {
  if (!age) {
    return '';
  }
  if (age < 30) {
    return 'Snr';
  }
  if (age >= 30 && age < 40) {
    return 'Mas';
  }
  if (age >= 40 && age < 50) {
    return 'Vet';
  }
  if (age >= 50 && age < 60) {
    return '50+';
  }
  return '60+';
};
