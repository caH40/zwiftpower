import { getCurrencySymbol, getUnitData } from '../../utils/pricing';

import styles from './Price.module.css';

export default function Price({ services }) {
  return (
    <ul className={styles.list}>
      {services.map(({ plans, _id, name, description }) => {
        return plans.map(({ amount, item }) => (
          <li key={`${_id}-${item.quantity}-${item.unit}`} className={styles.item}>
            <div className={styles.info}>
              <h2 className={styles.title}>
                {name} ({`${item.quantity} ${getUnitData(item.unit)}`})
              </h2>
              <p className={styles.description}>{description}</p>
            </div>

            <div className={styles.price}>
              {amount.value}
              {getCurrencySymbol(amount.currency)}
            </div>
          </li>
        ));
      })}
    </ul>
  );
}
