/**
 * Возвращает конфигурацию боковой панели (aside) для текущего маршрута.
 *
 * Функция ищет первый конфиг, путь которого совпадает с текущим `pathname`.
 * Поддерживаются два режима сопоставления:
 *
 * 1. Точное совпадение (`startsWith: false`)
 *    - pathname === path
 *    - пример: '/' → '/'
 *
 * 2. Совпадение по префиксу (`startsWith: true`)
 *    - pathname.startsWith(path)
 *    - пример: '/race/schedule/123' → '/race/schedule'
 *
 * Если подходящий конфиг не найден, возвращается `null`.
 *
 * @param {Array<{
 *   paths: string[],        // Список путей, к которым применяется конфиг
 *   showAside: boolean,     // Показывать ли боковую панель на странице
 *   includeChildren: boolean,   // Применимо ко всем вложенным страницам
 *   widgets: string[],     // Список виджетов для отображения в aside
 *   ads: string[],         // Список рекламных блоков для отображения в aside
 * }>} configs
 *
 * @param {string} pathname  // Текущий путь из react-router (location.pathname)
 *
 * @returns {object|null}    // Найденный конфиг или null, если конфиг не найден
 */
export function getAsideEntitiesConfig(configs, pathname) {
  const config = configs.find((c) => {
    if (c.includeChildren) {
      return c.paths.some((p) => pathname.startsWith(p));
    }

    return c.paths.includes(pathname);
  });

  return config ?? null;
}
