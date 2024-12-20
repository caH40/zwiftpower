import { useDispatch } from 'react-redux';

import { handleVkAuth } from '../../../services/vkAuthService';
import { getAuth } from '../../../redux/features/authSlice';
import { getAlert } from '../../../redux/features/alertMessageSlice';

import styles from './OAuth.module.css';

/**
 * Блок регистрации через OAuth.
 */
export default function OAuth() {
  const dispatch = useDispatch();

  const handlerOnClickVk = async () => {
    try {
      const user = await handleVkAuth();

      dispatch(getAuth({ status: true, user }));
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
