import styles from './Td.module.css';

/**
 * Преобразование массива zwiftId в строку
 * @param {[number]} param0 массив дополнительных zwiftId привязанных к профилю
 */
function TdZwiftIdAdditional({ value = [] }) {
  return (
    <td>
      <div className={styles.zwiftIdAdditional}>{value.join(', ')}</div>
    </td>
  );
}

export default TdZwiftIdAdditional;
