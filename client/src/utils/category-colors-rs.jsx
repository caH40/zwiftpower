import { racingScoreDefault as rs } from '../assets/rule-category';

/**
 * Получение массива цветов для каждой категории для RacingScore для диаграмм.
 * @param {{ftp:number,quantityMale:number,quantityFemale:number}[]} data распределение райдеров по значениям FTP
 * @param {boolean} isMale диаграмма для мужчин или женщин
 * @returns массив цветов по категориям, например ['rgba(252, 207, 11, 0.7)']
 */
export const getCategoryColorsRS = (data, isMale) => {
  return data.map((elm) => {
    if (elm.scoreRange < rs.D.min) {
      return 'rgba(148, 62, 94, 0.8)';
    } else if (elm.scoreRange < rs.C.min) {
      return 'rgba(252, 207, 11, 0.8)';
    } else if (elm.scoreRange < rs.B.min) {
      return 'rgba(62, 192, 233, 0.8)';
    } else if (elm.scoreRange < rs.A.min) {
      return 'rgba(88, 195, 78, 0.8)';
    } else if (elm.scoreRange >= rs.A.min) {
      return 'rgba(220, 65, 25, 0.8)';
    }

    return 'rgba(97, 97, 97, 0.8)';
  });
};
