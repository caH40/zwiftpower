import TransactionCard from '../TransactionCard/TransactionCard';

import styles from './TransactionsBlock.module.css';

/**
 * Список транзакций пользователя.
 */
export default function TransactionsBlock({ transactions }) {
  return (
    <div className={styles.wrapper}>
      {transactions.map((transaction) => (
        <TransactionCard transaction={transaction} key={transaction._id} />
      ))}
    </div>
  );
}
