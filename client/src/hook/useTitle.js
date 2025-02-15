import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setTitlePage } from '../redux/features/titleSlice';

/**
 * Хук для управления заголовком страницы.
 * При изменении переданного заголовка (title) он сохраняется в Redux-хранилище.
 * Это позволяет централизованно управлять заголовком страницы в приложении.
 *
 * @param {string} title - Заголовок страницы, который будет установлен.
 * @example
 * // Использование в компоненте:
 * useTitle('Главная страница');
 */
const useTitle = (title) => {
  const dispatch = useDispatch();

  // Используем useEffect для обновления заголовка при изменении title.
  useEffect(() => {
    dispatch(setTitlePage({ title }));
  }, [title, dispatch]);
};

export default useTitle;
