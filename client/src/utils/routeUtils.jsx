import { Route, Navigate } from 'react-router-dom';

/**
 * Создает Route компонент для перенаправления на страницу 403 (Forbidden)
 * при отсутствии прав доступа к защищенным маршрутам
 *
 * @param {string} path - Путь маршрута, для которого требуется проверка доступа
 * @returns {JSX.Element} React Route компонент с Navigate на /403
 */
export const navigateTo403 = (path) => (
  <Route path={path} element={<Navigate to="/403" replace />}></Route>
);
