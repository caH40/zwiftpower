import { ftpFemale, ftpMale } from '../assets/rule-category';

/**
 * Получение массива цветов для каждой категории
 * @param {{ftp:number,quantityMale:number,quantityFemale:number}[]} data распределение райдеров по значениям FTP
 * @param {boolean} isMale диаграмма для мужчин или женщин
 * @returns массив цветов по категориям, например ['rgba(252, 207, 11, 0.7)']
 */
export const getCategoryColors = (data, isMale) => {
  const { APlusLow } = ftpMale; // для женщин такой же порог А+
  const ALow = isMale ? ftpMale.ALow : ftpFemale.ALow;
  const BLow = isMale ? ftpMale.BLow : ftpFemale.BLow;
  const CLow = isMale ? ftpMale.CLow : ftpFemale.CLow;

  return data.map((elm) => {
    if (elm.ftp < CLow) {
      return 'rgba(252, 207, 11, 0.8)';
    } else if (elm.ftp >= CLow && elm.ftp < BLow) {
      return 'rgba(62, 192, 233, 0.8)';
    } else if (elm.ftp >= BLow && elm.ftp < ALow) {
      return 'rgba(88, 195, 78, 0.8)';
    } else if (elm.ftp >= ALow && elm.ftp < APlusLow) {
      return 'rgba(220, 65, 25, 0.8)';
    } else {
      return 'rgba(0, 0, 0, 0.8)';
    }
  });
};
