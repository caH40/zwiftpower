import { Rider } from '../../Model/Rider.js';
import { getCurrentDocsOnPage } from '../../utils/pagination.js';

// types
import { GetRidersQuery } from '../../types/http.interface.js';

/**
 * Сервис получения списка райдеров по фильтру search (поиск по имени и фамилии)
 */
export const getRidersService = async ({
  page = 1,
  docsOnPage = 20,
  search = '.',
}: GetRidersQuery) => {
  const ridersDB = await Rider.find({
    $or: [{ firstName: { $regex: search } }, { lastName: { $regex: search } }],
  })
    .sort({ totalEvents: 1 })
    .lean();

  return getCurrentDocsOnPage(ridersDB, page, docsOnPage);
};
