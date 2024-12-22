import { useDispatch } from 'react-redux';

import { handleVkAuth } from '../../../services/vkAuthService';
import { getAuth } from '../../../redux/features/authSlice';
import { getAlert } from '../../../redux/features/alertMessageSlice';
import { useDeviceInfo } from '../../../hook/useDeviceInfo';
import { useLocationInfo } from '../../../hook/useLocationInfo';

import styles from './OAuth.module.css';

/**
 * Блок регистрации через OAuth.
 */
export default function OAuth() {
  const dispatch = useDispatch();

  const device = useDeviceInfo();
  const location = useLocationInfo();

  const handlerOnClickVk = async () => {
    try {
      const user = await handleVkAuth({ device, location });

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
