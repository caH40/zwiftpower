import { Rider } from '../../Model/Rider.js';
import { PowerCurve } from '../../Model/PowerCurve.js';
import { getCurrentDocsOnPage } from '../../utils/pagination.js';

// types
import { GetRidersQuery } from '../../types/http.interface.js';
import { PowerCurveSchema, RiderProfileSchema } from '../../types/model.interface.js';
import { addPropertyAdditionCP } from '../../utils/property-additionCP.js';

/**
 * Сервис получения списка райдеров по фильтру search (поиск по имени и фамилии)
 */
export const getRidersService = async ({
  page = 1,
  docsOnPage = 20,
  search = '.',
}: GetRidersQuery) => {
  const ridersDB: RiderProfileSchema[] = await Rider.find({
    $or: [
      { firstName: { $regex: search, $options: 'i' } },
      { lastName: { $regex: search, $options: 'i' } },
    ],
  })
    .sort({ totalEvents: -1 })
    .lean();

  const ridersWithSequence = ridersDB.map((elm, index) => ({
    sequenceNumber: index + 1,
    ...elm,
  }));

  const { currentDocs, currentPage, quantityPages } = getCurrentDocsOnPage(
    ridersWithSequence,
    page,
    docsOnPage
  );

  // добавление CriticalPowers
  const zwiftIds = currentDocs.map((doc) => doc.zwiftId);
  const powerCurveDB: PowerCurveSchema[] = await PowerCurve.find({ zwiftId: zwiftIds });

  const currentDocsWithCP = currentDocs.map((doc) => {
    const powerCurve = powerCurveDB.find((elm) => elm.zwiftId === doc.zwiftId);
    if (!powerCurve) {
      return { ...doc, cpBestEfforts: undefined };
    }
    // изменение powerCurve на cpBestEfforts
    const cpBestEfforts = addPropertyAdditionCP(powerCurve);

    return { ...doc, cpBestEfforts };
  });

  return { riders: currentDocsWithCP, currentPage, quantityPages };
};
