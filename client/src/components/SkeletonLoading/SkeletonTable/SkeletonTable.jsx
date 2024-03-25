import styles from './SkeletonTable.module.css';

/**
 * Отображение пустых строк таблицы во время загрузки данных.
 * @param {object} props - Пропсы.
 * @param {'resolved' | 'loading' | 'rejected' } props.status Статус получения данных с сервера,
 * то есть количество строк таблицы, которые необходимо отобразить во время загрузки.
 * @param {number} props.docsOnPage Количество результатов на странице (количество строк).
 * @param {number} props.columns - Количество статичных столбцов.
 * @param {number | string} props.height - Высота строк в пикселях или в em, rem.
 * @returns {JSX.Element} - Компонент отображения загрузки таблицы.
 */
function SkeletonTable({ status, rows, height = '2rem' }) {
  return (
    status === 'loading' && (
      <section className={styles.wrapper}>
        <table className={styles.table}>
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
