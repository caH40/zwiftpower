import { SortOrder } from 'mongoose';

import { Rider } from '../../Model/Rider.js';
import { PowerCurve } from '../../Model/PowerCurve.js';
import { getCurrentDocsOnPage } from '../../utils/pagination.js';

// types
import { IRidersQuery } from '../../types/http.interface.js';
import { PowerCurveSchema, RiderProfileSchema } from '../../types/model.interface.js';
import { addPropertyAdditionCP } from '../../utils/property-additionCP.js';
import { categoryFilter } from './utils.js';

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
    $and: [
      {
        $or: [
          { firstName: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } },
        ],
      },
      categoryFilter({ category }), // добавляем фильтр по категории
    ],
  })
    .sort(sort)
    .lean();

  // добавление CriticalPowers
  const zwiftIds = ridersDB.map((doc) => doc.zwiftId);
  const powerCurveDB: PowerCurveSchema[] = await PowerCurve.find({ zwiftId: zwiftIds });

  const resultsWithCP = ridersDB.map((doc) => {
    const powerCurve = powerCurveDB.find((elm) => elm.zwiftId === doc.zwiftId);
    if (!powerCurve) {
      return { ...doc, cpBestEfforts: undefined };
    }
    // изменение powerCurve на cpBestEfforts
    const cpBestEfforts = addPropertyAdditionCP(powerCurve);

    return { ...doc, cpBestEfforts };
  });

  // Сортировка по удельной мощности только когда columnName соответствует числу (длительность интервала).
  if (!isNaN(Number(columnName))) {
    resultsWithCP.sort((a, b) => {
      const aWattsKg =
        a.cpBestEfforts?.find((cp) => cp.duration === +columnName)?.wattsKg.value || 0;
      const bWattsKg =
        b.cpBestEfforts?.find((cp) => cp.duration === +columnName)?.wattsKg.value || 0;

      if (isRasing) {
        return aWattsKg - bWattsKg;
      } else {
        return bWattsKg - aWattsKg;
      }
    });
  }

  const ridersWithSequence = resultsWithCP.map((elm, index) => ({
    sequenceNumber: index + 1,
    ...elm,
  }));

  const { currentDocs, currentPage, quantityPages } = getCurrentDocsOnPage(
    ridersWithSequence,
    page,
    docsOnPage
  );

  return { riders: currentDocs, currentPage, quantityPages };
};
