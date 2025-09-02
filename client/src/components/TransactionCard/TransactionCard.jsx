import cn from 'classnames';

import styles from './TransactionCard.module.css';

/**
 * Карточка отдельной транзакции.
 *
 * @param {Object} props
 * @param {Object} props.transaction - Объект транзакции.
 * @param {string} props.transaction._id - MongoDB ObjectId транзакции.
 * @param {string} props.transaction.id - Внутренний UUID транзакции.
 * @param {string} props.transaction.event - Тип события, например `"payment.succeeded"`.
 * @param {string} props.transaction.user - ID пользователя, которому принадлежит транзакция.
 * @param {string} props.transaction.status - Статус транзакции, например `"succeeded"`.
 * @param {string} props.transaction.description - Описание транзакции.
 * @param {Object} props.transaction.amount - Сумма транзакции.
 * @param {number} props.transaction.amount.value - Значение суммы.
 * @param {string} props.transaction.amount.currency - Валюта, например `"RUB"`.
 * @param {Object} props.transaction.income_amount - Фактический доход после комиссии.
 * @param {number} props.transaction.income_amount.value - Значение дохода.
 * @param {string} props.transaction.income_amount.currency - Валюта дохода.
 * @param {Object} props.transaction.metadata - Дополнительные данные транзакции.
 * @param {string} props.transaction.metadata.entityName - Название сущности, например `"organizer"`.
 * @param {number} props.transaction.metadata.quantity - Количество единиц, например `1`.
 * @param {string} props.transaction.metadata.unit - Единица измерения, например `"month"`.
 * @param {string} props.transaction.capturedAt - Дата и время подтверждения транзакции (ISO 8601).
 * @param {string} props.transaction.createdAt - Дата и время создания транзакции (ISO 8601).
 *
 * @returns {JSX.Element} Компонент карточки транзакции.
 */
export default function TransactionCard({ transaction, theme = 'gray' }) {
  // Форматирование дат
  const capturedAt = transaction ? new Date(transaction.capturedAt).toLocaleDateString() : '';
  const createdAt = transaction ? new Date(transaction.createdAt).toLocaleDateString() : '';

  return (
    <dl className={cn(styles.list, styles[theme])}>
      <dt className={styles.title}>Описание</dt>
      <dd className={styles.description}>{transaction.description}</dd>

      <dt className={styles.title}>Создано</dt>
      <dd className={styles.description}>{createdAt}</dd>

      <dt className={styles.title}>ID</dt>
      <dd className={styles.description}>{transaction.id}</dd>

      <dt className={styles.title}>Статус</dt>
      <dd className={styles.description}>{transaction.status}</dd>

      <dt className={styles.title}>Сумма</dt>
      <dd className={styles.description}>
        {transaction.amount.value} {transaction.amount.currency}
      </dd>

      <dt className={styles.title}>Сущность</dt>
      <dd className={styles.description}>
        {transaction.metadata.entityName} — {transaction.metadata.quantity}{' '}
        {transaction.metadata.unit}
      </dd>

      <dt className={styles.title}>Подтверждение</dt>
      <dd className={styles.description}>{capturedAt}</dd>
    </dl>
  );
}
