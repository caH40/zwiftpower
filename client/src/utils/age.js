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

/**
 * Получение Названий (labels) возрастов для диаграммы "Возрастные категории"
 * @param {[{label:string},{value:number}]} dataForChart данные для диаграммы "Возрастные категории"
 * @returns {[string]} массив названий возрастных категорий
 */
export const getAgeCategoryLabels = (dataForChart) => {
  return dataForChart.map((data) => {
    switch (data.label) {
      case 'Master':
        return '30-39 лет';
      case 'Veteran':
        return '40-49 лет';
      case '50+':
        return '50-59 лет';
      case '60+':
        return '>= 60 лет';
      // по умолчанию всех в Senior
      default:
        return '< 30 лет';
    }
  });
};
