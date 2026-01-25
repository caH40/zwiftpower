/**
 * Формирует текстовое описание временных штрафов для результата.
 *
 * @param {Object[]} penalty Список временных штрафов.
 * @param {string} penalty[].reason Причина штрафа.
 * @param {number} penalty[].timeInMilliseconds Время штрафа в миллисекундах.
 * @param {Object} [penalty[].moderator] Модератор, назначивший штраф.
 * @param {string} [penalty[].moderator.username] username Модератора, назначивший штраф.
 * @param {string} [penalty[].moderator._id] _id Модератора.
 * @param {string} penalty[].moderator._id ID модератора.
 * @param {string} penalty[].moderator.username Имя пользователя модератора.
 * @param {Date} [penalty[].modifiedAt] Дата последнего изменения штрафа.
 *
 * @returns {string|null} Описание штрафов или null, если штрафов нет.
 */
export function timePenaltyDescription(penalty) {
  if (penalty.length === 0) {
    return null;
  }

  let description = '';

  penalty.forEach((p, index) => {
    description += `${index + 1}. ${p.timeInMilliseconds / 1000} секунд - ${p.reason}. Установлен ${p.moderator ? p.moderator.username : 'автоматически'}; `;
  });

  return description;
}
