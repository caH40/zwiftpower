export function generateConsistentDarkColor(shortName) {
  // Создаем стабильный хэш
  let hash = 0;
  for (let i = 0; i < shortName.length; i++) {
    hash = shortName.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Генерируем цвет в темном диапазоне
  const baseColor = Math.abs(hash) % 360; // 0-359 для hue

  // Преобразуем HSL к темному тону
  return `hsl(${baseColor}, 85%, 30%)`;
}
