/**
 * Преобразование возраста из лет в возрастную категорию
 * @param {number} age возраст полных лет
 * @returns {string} возрастная категория
 */
export const getAgeCategory = (age: number): string => {
  if (!age) {
    return '';
  }
  if (age < 30) {
    return 'Senior';
  }
  if (age >= 30 && age < 40) {
    return 'Master';
  }
  if (age >= 40 && age < 50) {
    return 'Veteran';
  }
  if (age >= 50 && age < 60) {
    return '50+';
  }
  return '60+';
};
