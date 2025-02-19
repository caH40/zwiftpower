import styles from './YooMoneyButton.module.css';

export default function YooMoneyButton() {
  return (
    <div className={styles.wrapper}>
      <iframe
        title="Кнопка платежа YooMoney"
        src="https://yoomoney.ru/quickpay/fundraise/button?billNumber=18G6ISVKNHD.250218&"
        width="260"
        height="40"
        className={styles.iframe}
        loading="lazy"
      />
    </div>
  );
}
