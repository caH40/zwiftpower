import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { authenticateWithVk } from '../../../services/vkAuthService';
import { getAuth } from '../../../redux/features/authSlice';
import { getAlert } from '../../../redux/features/alertMessageSlice';
import { lsAccessToken } from '../../../constants/localstorage';
import { postRegistrationVk } from '../../../api/registration';
import { postAuthorizationVk } from '../../../api/authorization';
import { postLinkVkAccount } from '../../../api/link';

import styles from './OAuth.module.css';

/**
 * Компонент для работы с OAuth.
 *
 * @param {Object} props - Свойства компонента.
 * @param {'register' | 'login' | 'link'} props.mode - Режим работы компонента:
 * - `register`: Регистрация пользователя.
 * - `login`: Авторизация пользователя.
 * - `link`: Привязка аккаунта.
 * @param {string} props.device - Информация об устройстве пользователя.
 * @param {string} props.location - Местоположение пользователя.
 */
export default function OAuth({ mode, device, location }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * Выполнение действия в зависимости от режима.
   *
   * @param {Object} tokens - Токены VK ID.
   * @returns {Promise<Object>} Ответ от API.
   */
  const performAction = async (tokens) => {
    switch (mode) {
      case 'register':
        return postRegistrationVk({ tokens, device, location });

      case 'login':
        return postAuthorizationVk({ tokens, device, location });

      case 'link':
        return postLinkVkAccount({ tokens });

      default:
        throw new Error('Некорректный режим работы компонента. Не определён пропс mode.');
    }
  };

  /**
   * Обработчик клика по иконке VK ID.
   */
  const handlerOnClickVk = async () => {
    try {
      // Аутентификация через VK ID.
      const tokens = await authenticateWithVk();

      // Выполнение действия в зависимости от режима.
      const response = await performAction(tokens);

      if (mode !== 'link') {
        // Сохранение токена в localStorage и переход на предыдущую страницу.
        localStorage.setItem(lsAccessToken, response.data.accessToken);
        navigate(-1);
      }

      // Обновление состояния аутентификации и отображение уведомления.
      dispatch(getAuth({ status: true, user: response.data.user }));
      dispatch(getAlert({ message: response.message, type: 'success', isOpened: true }));
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      dispatch(getAlert({ message, type: 'error', isOpened: true }));
    }
  };

  return (
    <section className={styles.wrapper}>
      <img
        className={styles.icon}
        src="/images/vk.svg"
        onClick={handlerOnClickVk}
        alt="OAuth icon"
        role="button"
      />
    </section>
  );
}
