import styles from './Td.module.css';

function TdSpeed({ speed }) {
  return (
    <td className={styles.td__nowrap}>
      {Math.round(speed * 10) / 10}
      <span className={styles.small}>км/ч</span>
    </td>
  );
}

export default TdSpeed;
