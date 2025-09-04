import { helmetProps } from '../../assets/helmet-props.js';
import { HelmetComponent } from '../../components/Helmets/HelmetComponent.jsx';
import { termsOfUse } from '../../locales/terms-of-use.json';
import Document from '../../components/Document/Document.jsx';
import useTitle from '../../hook/useTitle.js';

import styles from './Legal.module.css';

/**
 * Страница Пользовательского соглашения.
 */
export default function TermsOfUse() {
  useTitle('Пользовательское соглашение');
  return (
    <div className={styles.wrapper}>
      <HelmetComponent {...helmetProps.PRIVATE_POLICE} />

      <Document dataJson={termsOfUse} />
    </div>
  );
}
