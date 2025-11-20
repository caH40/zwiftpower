/**
 * @param {number} count
 * @param {'vote' | 'user'} entity
 * @returns {string}
 */
export function getDeclensionText(count, entity) {
  const normalized = Math.abs(count);
  const mod10 = normalized % 10;
  const mod100 = normalized % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return glossary[entity][0];
  }
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) {
    return glossary[entity][1];
  }
  return glossary[entity][2];
}

const glossary = {
  vote: ['голос', 'голоса', 'голосов'],
  user: ['участник', 'участника', 'участников'],
};
