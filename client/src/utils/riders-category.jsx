import { ftpFemale, ftpMale } from '../assets/rule-category';

/**
 * Получение массива количества райдеров по категориям FTP
 * @param {{ftp:number,quantityMale:number,quantityFemale:number}[]} data распределение райдеров по значениям FTP
 * @param {boolean} isMale диаграмма для мужчин или женщин
 * @returns {{ category:string , quantity: number, isMale:boolean} }
 */
export const getRidersInCategory = (data, isMale) => {
  const { APlusLow } = ftpMale; // для женщин такой же порог А+
  const ALow = isMale ? ftpMale.ALow : ftpFemale.ALow;
  const BLow = isMale ? ftpMale.BLow : ftpFemale.BLow;
  const CLow = isMale ? ftpMale.CLow : ftpFemale.CLow;

  let APlus = 0;
  let A = 0;
  let B = 0;
  let C = 0;
  let D = 0;

  for (const elm of data) {
    if (elm.ftp < CLow) {
      D += isMale ? elm.quantityMale : elm.quantityFemale;
    } else if (elm.ftp < BLow) {
      C += isMale ? elm.quantityMale : elm.quantityFemale;
    } else if (elm.ftp < ALow) {
      B += isMale ? elm.quantityMale : elm.quantityFemale;
    } else if (elm.ftp < APlusLow) {
      A += isMale ? elm.quantityMale : elm.quantityFemale;
    } else {
      // у женщин нет A+ поэтому все результаты выше добавляются в А
      if (isMale) {
        APlus += elm.quantityMale;
      } else {
        A += elm.quantityFemale;
      }
    }
  }

  // формирование результирующего массива данных
  const ridersInCategory = [
    { category: 'APlus', quantity: APlus, isMale },
    { category: 'A', quantity: A, isMale },
    { category: 'B', quantity: B, isMale },
    { category: 'C', quantity: C, isMale },
    { category: 'D', quantity: D, isMale },
  ];

  // удаление APlus у женщин, так как нет такой категории
  if (!isMale) {
    ridersInCategory.shift();
  }

  return ridersInCategory;
};
