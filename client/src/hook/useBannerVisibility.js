/**
 * Хук для управления видимостью баннера на основе данных в локальном хранилище.
 * @param {object} props - Пропсы.
 * @param {string} props.storageKey — Ключ для хранения данных в localStorage.
 * @param {number} props.intervalMs — Временной промежуток в мс, через который баннер будет отображаться снова.
 * @returns {boolean} Возвращает булево значение видимости баннера.
 */
const useBannerVisibility = ({ storageKey, intervalMs }) => {
  const dateClosedFromLC = localStorage.getItem(storageKey);
  const dateClosed = new Date(dateClosedFromLC).getTime();

  // Проверка на валидность даты/
  if (!dateClosedFromLC || isNaN(dateClosed)) {
    return true;
  }

  // Проверка, прошло ли достаточно времени для повторного отображения баннера.
  const needVisible = Date.now() - dateClosed > intervalMs;

  return needVisible;
};

export default useBannerVisibility;
