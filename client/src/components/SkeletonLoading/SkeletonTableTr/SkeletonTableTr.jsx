import styles from './SkeletonProfileBlock.module.css';

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
function SkeletonTableTr({ status, docsOnPage, columns, height = '2rem' }) {
  return (
    <>
      {status === 'loading' &&
        Array(docsOnPage)
          .fill(null)
          .map((_, index) => (
            <tr key={index} style={{ height }} className={styles.loading}>
              {Array(columns)
                .fill(null)
                .map((_, indexTd) => (
                  <td key={indexTd} />
                ))}
            </tr>
          ))}
    </>
  );
}

export default SkeletonTableTr;
