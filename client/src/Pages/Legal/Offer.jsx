import { LEGAL_HELMET_PROPS } from '../../assets/helmet-props.js';
import Document from '../../components/Document/Document.jsx';
import { HelmetComponent } from '../../components/Helmets/HelmetComponent.jsx';
import useTitle from '../../hook/useTitle.js';
import { offer } from '../../locales/offer.json';

import styles from './Legal.module.css';

/**
 * Страница "ПУБЛИЧНАЯ ОФЕРТА".
 */
export default function Offer() {
  useTitle('Публичная оферта на оказание платных услуг');
  return (
    <div className={styles.wrapper}>
      <HelmetComponent {...LEGAL_HELMET_PROPS.OFFER} />

      <Document dataJson={offer} />
    </div>
  );
}
