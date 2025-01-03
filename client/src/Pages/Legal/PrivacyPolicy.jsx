import Document from '../../components/Document/Document.jsx';
import { privacyPolicy } from '../../locales/privacy-policy.json';
import { applicationPrivacyPolicy } from '../../locales/application-1.json';

import styles from './Legal.module.css';

/**
 * Страница "Политика конфиденциальности".
 */
export default function PrivacyPolicy() {
  return (
    <div className={styles.wrapper}>
      <Document dataJson={privacyPolicy} />
      <Document dataJson={applicationPrivacyPolicy} />
    </div>
  );
}
