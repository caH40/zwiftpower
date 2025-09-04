import Document from '../../components/Document/Document.jsx';
import { offer } from '../../locales/offer.json';

import styles from './Legal.module.css';

/**
 * Страница "ПУБЛИЧНАЯ ОФЕРТА".
 */
export default function Offer() {
  return (
    <div className={styles.wrapper}>
      <Document dataJson={offer} />
    </div>
  );
}
