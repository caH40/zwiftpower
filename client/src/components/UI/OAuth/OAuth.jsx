import { useDispatch } from 'react-redux';

import { authenticateWithVk } from '../../../services/vkAuthService';
import { getAuth } from '../../../redux/features/authSlice';
import { getAlert } from '../../../redux/features/alertMessageSlice';
import { useDeviceInfo } from '../../../hook/useDeviceInfo';
import { useLocationInfo } from '../../../hook/useLocationInfo';
import { postRegistrationVk } from '../../../api/registration';
import { postAuthorizationVk } from '../../../api/authorization';

import styles from './OAuth.module.css';

/**
 * Блок регистрации через OAuth.
 */
export default function OAuth({ isRegistration }) {
  const dispatch = useDispatch();

  const device = useDeviceInfo();
  const location = useLocationInfo();

  // Регистрация на сайте используя данные с сервиса VK ID.
  const registerUserVk = async (tokens) => {
    return await postRegistrationVk({ tokens, device, location });
  };

  // Авторизация на сайте используя данные с сервиса VK ID.
  const authorizeUserVk = async (tokens) => {
    return await postAuthorizationVk({ tokens, device, location });
  };

  const handlerOnClickVk = async () => {
    try {
      // Аутентификация через VK ID.
      const tokens = await authenticateWithVk({ device, location });

      // Регистрация или авторизация на сервере сайта.
      const user = isRegistration
        ? await registerUserVk(tokens)
        : await authorizeUserVk(tokens);

      dispatch(getAuth({ status: true, user }));
    } catch (error) {
      const messageAxios = error.response?.data?.message;

      dispatch(
        getAlert({ message: messageAxios || error.message, type: 'error', isOpened: true })
      );
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
