import { SortOrder } from 'mongoose';

import { Rider } from '../../Model/Rider.js';
import { PowerCurve } from '../../Model/PowerCurve.js';
import { getCurrentDocsOnPage } from '../../utils/pagination.js';

// types
import { IRidersQuery } from '../../types/http.interface.js';
import { PowerCurveSchema, RiderProfileSchema } from '../../types/model.interface.js';
import { addPropertyAdditionCP } from '../../utils/property-additionCP.js';

/**
 * Сервис получения списка райдеров по фильтру search (поиск по имени и фамилии)
 */
export const getRidersService = async ({
  page = 1,
  docsOnPage = 20,
  search = '.',
  columnName = 'totalEvents',
  isRasing = false,
  category = 'All',
}: IRidersQuery) => {
  const sort: { [key: string]: SortOrder } = { [columnName]: isRasing ? 1 : -1 };

  const ridersDB: RiderProfileSchema[] = await Rider.find({
    $or: [
      { firstName: { $regex: search, $options: 'i' } },
      { lastName: { $regex: search, $options: 'i' } },
    ],
  })
    .sort(sort)
    .lean();

  let riderFilteredCategory = [] as RiderProfileSchema[];
  if (category === 'All') {
    riderFilteredCategory = ridersDB;
  } else {
    riderFilteredCategory = ridersDB.filter((rider) => {
      // Если нет данных по competitionMetrics.
      if (!rider.competitionMetrics) {
        return false;
      }

      // Для мужчин и женщин разные категории.
      if (rider.male) {
        return rider.competitionMetrics.category === category;
      } else {
        return rider.competitionMetrics.categoryWomen === category;
      }
    });
  }

  const ridersWithSequence = riderFilteredCategory.map((elm, index) => ({
    sequenceNumber: index + 1,
    ...elm,
  }));

  // добавление CriticalPowers
  const zwiftIds = ridersWithSequence.map((doc) => doc.zwiftId);
  const powerCurveDB: PowerCurveSchema[] = await PowerCurve.find({ zwiftId: zwiftIds });

  const resultsWithCP = ridersWithSequence.map((doc) => {
    const powerCurve = powerCurveDB.find((elm) => elm.zwiftId === doc.zwiftId);
    if (!powerCurve) {
      return { ...doc, cpBestEfforts: undefined };
    }
    // изменение powerCurve на cpBestEfforts
    const cpBestEfforts = addPropertyAdditionCP(powerCurve);

    return { ...doc, cpBestEfforts };
  });

  // Сортировка по удельной мощности.
  resultsWithCP.sort((a, b) => {
    const aWattsKg =
      a.cpBestEfforts?.find((cp) => cp.duration === +columnName)?.wattsKg.value || 0;
    const bWattsKg =
      b.cpBestEfforts?.find((cp) => String(cp.duration) === columnName)?.wattsKg.value || 0;

    if (isRasing) {
      return aWattsKg - bWattsKg;
    } else {
      return bWattsKg - aWattsKg;
    }
  });

  const { currentDocs, currentPage, quantityPages } = getCurrentDocsOnPage(
    resultsWithCP,
    page,
    docsOnPage
  );

  return { riders: currentDocs, currentPage, quantityPages };
};
