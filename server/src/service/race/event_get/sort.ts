import { SignedRidersPowerCurves } from '../../../types/types.interface.js';

/**
 * Сортировка по названию группы (по убыванию)
 * Сортировка в каждой группе по Имени райдера
 * @param signedRiders райдеры, зарегистрированные в Эвенте
 * @param labelsSubgroup названия групп (лэйблы) которые есть в Эвенте
 * @returns отсортированные райдеры
 */
export const sortSignedRiders = (
  signedRiders: SignedRidersPowerCurves[],
  labelsSubgroup: string[]
): SignedRidersPowerCurves[] => {
  labelsSubgroup.sort((a, b) => a.toLocaleLowerCase().localeCompare(b.toLowerCase()));

  // инициализация массива для добавление отсортированных райдер
  const signedRidersSorted = [] as SignedRidersPowerCurves[];

  for (const label of labelsSubgroup) {
    const group = signedRiders
      .filter((signedRider) => signedRider.subgroupLabel === label)
      .sort((a, b) =>
        a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase(), 'en', {
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#sensitivity
          ignorePunctuation: true,
        })
      );
    signedRidersSorted.push(...group);
  }

  return signedRidersSorted;
};
