/**
 * Определяет статус события: заезда, эвента, серии заездов.
 *
 * @param {string} startEventDate - Дата старта события.
 * @param {string} endEventDate - Дата финиша события.
 * @returns {'upcoming' | 'ongoing' | 'completed'}
 */
export function getEventStatus(startEventDate, endEventDate) {
  const now = Date.now();
  const startDate = new Date(startEventDate).getTime();
  const endDate = new Date(endEventDate).getTime();

  if (now < startDate) {
    return 'upcoming';
  } else if (now >= startDate && now <= endDate) {
    return 'ongoing';
  } else {
    return 'completed';
  }
}
