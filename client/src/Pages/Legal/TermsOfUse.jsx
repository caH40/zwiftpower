import Document from '../../components/Document/Document.jsx';
import { termsOfUse } from '../../locales/terms-of-use.json';

import styles from './Legal.module.css';

/**
 * Страница Пользовательского соглашения.
 */
export default function TermsOfUse() {
  return (
    <div className={styles.wrapper}>
      <Document dataJson={termsOfUse} />
    </div>
  );
}
