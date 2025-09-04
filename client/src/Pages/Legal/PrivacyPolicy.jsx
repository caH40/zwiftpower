import Document from '../../components/Document/Document.jsx';
import { privacyPolicy } from '../../locales/privacy-policy.json';
import { applicationPrivacyPolicy } from '../../locales/application-1.json';
import useTitle from '../../hook/useTitle.js';
import { helmetProps } from '../../assets/helmet-props.js';
import { HelmetComponent } from '../../components/Helmets/HelmetComponent.jsx';

import styles from './Legal.module.css';

/**
 * Страница "Политика конфиденциальности".
 */
export default function PrivacyPolicy() {
  useTitle('Политика конфиденциальности');
  return (
    <div className={styles.wrapper}>
      <HelmetComponent {...helmetProps.PRIVATE_POLICE} />

      <Document dataJson={privacyPolicy} />
      <Document dataJson={applicationPrivacyPolicy} />
    </div>
  );
}
