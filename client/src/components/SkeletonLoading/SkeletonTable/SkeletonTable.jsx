import styles from './SkeletonTable.module.css';

/**
 * Компонент отображения пустых строк таблицы во время загрузки данных.
 * @param {Object} props - Свойства компонента.
 * @param {'resolved' | 'loading' | 'rejected'} props.status - Статус получения данных с сервера.
 * @param {number} [props.rows=5] - Количество строк таблицы, которые необходимо отобразить во время загрузки.
 * @param {number|string} [props.height='2rem'] - Высота строк в пикселях или в единицах em, rem.
 * @param {boolean} [props.needCaption=false] - Флаг, указывающий на необходимость показа названия таблицы.
 * @param {object} [props.style] - Стили для компонента.
 * @returns {JSX.Element|null} - Компонент , если статус загрузки равен 'loading', иначе null.
 */
function SkeletonTable({ status, rows = 5, height = '2rem', needCaption, style = null }) {
  return (
    status === 'loading' && (
      <section className={styles.wrapper} style={style}>
        <table className={styles.table}>
          {needCaption && <caption className={styles.caption} />}
          <thead>
            <tr className={styles.thead__tr}>
              <th />
            </tr>
          </thead>

          <tbody>
            {Array(rows)
              .fill(null)
              .map((_, index) => (
                <tr key={index} style={{ height }} className={styles.tr}>
                  <td />
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    )
  );
}

export default SkeletonTable;
