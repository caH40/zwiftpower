import { useSelector } from 'react-redux';

import useTitle from '../../../hook/useTitle';
import FormAccount from '../../../components/UI/FormAccount/FormAccount';
import JSONBlock from '../../../components/JSONBlock/JSONBlock';
import OAuth from '../../../components/UI/OAuth/OAuth';

import styles from './SettingsAccount.module.css';
import VkIdAuthInfoBlock from './AuthInfoBlocks/Vk';
import CredentialAuthInfoBlock from './AuthInfoBlocks/Credential';

/**
 * Страница настройки аккаунта.
 */
export default function SettingsAccount() {
  const { user } = useSelector((state) => state.checkAuth.value);

  // Если username или email начинается с temp_ значит они созданы автоматически
  // при регистрации через сторонние сервисы аутентификации (VK ID и т.д.)
  const hasCredentialAuth =
    !user?.username?.startsWith('temp_') && !user?.email?.startsWith('temp_');

  const hasVkAuth = user?.externalAccounts?.vk;

  const noAvailableAuthServices = hasVkAuth;

  useTitle('Настройка аккаунта');
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Данные аккаунта</h3>
      <div className={styles.wrapper__block}>
        <FormAccount role={user.role} username={user.username} userId={user.id} />
      </div>

      {/* Используемые сервисы аутентификации */}
      <h3 className={styles.title}>Используемые сервисы аутентификации</h3>
      {/* Блок аутентификации через логин/пароль */}
      {hasCredentialAuth && (
        <div className={styles.wrapper__block}>
          <CredentialAuthInfoBlock user={user} />
        </div>
      )}

      {/* Блок аутентификации через VK ID */}
      {hasVkAuth && (
        <div className={styles.wrapper__block}>
          <VkIdAuthInfoBlock user={user} />
        </div>
      )}

      <h3 className={styles.title}>Сервисы аутентификации для привязки</h3>
      <div className={styles.wrapper__block}>
        {noAvailableAuthServices ? 'Нет доступных сервисов аутентификации' : <OAuth />}
      </div>

      <JSONBlock json={user} />
    </div>
  );
}
