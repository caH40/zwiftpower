import { currency } from '../../assets/constants';

import styles from './Price.module.css';

export default function Price({ services }) {
  return (
    <ul className={styles.list}>
      {services.map(({ amount, _id, name, description }) => (
        <li key={_id} className={styles.item}>
          <div className={styles.info}>
            <h2 className={styles.title}>{name}</h2>
            <p className={styles.description}>{description}</p>
          </div>

          <div className={styles.price}>
            {amount.value}
            {currency.get(amount.currency)?.symbol}
          </div>
        </li>
      ))}
    </ul>
  );
}
