/**
 * Хук для управления видимостью баннера на основе данных в локальном хранилище.
 * Отображение происходит, если пользователь первый раз на странице с баннером, или
 * прошло время intervalMs после последнего просмотра и закрытия пользователем баннера.
 * @param {object} props - Пропсы.
 * @param {string} props.storageKey — Ключ для хранения данных в localStorage.
 * @param {number} props.intervalMs — Временной промежуток в мс, через который баннер будет отображаться снова.
 * @param {boolean} [props.hidden] — Не отображать по другим причинам, выполнено определенное условие для баннера.
 * @returns {boolean} Возвращает булево значение видимости баннера: true - баннер нужно показать, false - не нужно.
 */
const useBannerVisibility = ({ storageKey, intervalMs, hidden }) => {
  // Если по умолчании не отображать банер, то возвращение false.
  if (hidden) {
    return false;
  }

  const storedDateClosed = localStorage.getItem(storageKey);
  const dateClosed = new Date(storedDateClosed).getTime();

  // Проверка на валидность даты.
  if (!storedDateClosed || isNaN(dateClosed)) {
    return true;
  }

  // Проверка, прошло ли достаточно времени для повторного отображения баннера.
  const shouldShowBannerByTime = Date.now() - dateClosed > intervalMs;

  return shouldShowBannerByTime;
};

export default useBannerVisibility;
