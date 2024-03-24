/**
 * Отображение пустых строк таблицы во время загрузки данных.
 * @param {'resolved' | 'loading' | 'rejected' } status Статус получения данных с сервера,
 * то есть количество строк таблицы, которые необходимо отобразить во время загрузки.
 * @param {number} docsOnPage Количество результатов на странице (количество строк).
 * @param {number} columns - Количество статичных столбцов.
 * @param {number} columnsDynamic - Количество динамических столбцов.
 * @param {number | string} height - Высота строк в пикселях или в em,rem.
 * @returns {JSX.Element} - Компонент отображения загрузки таблицы.
 */
function TableLoading({ status, docsOnPage, columns, columnsDynamic, height = '2rem' }) {
  return (
    <>
      {status === 'loading' &&
        Array(docsOnPage)
          .fill(null)
          .map((_, index) => (
            <tr key={index} style={{ height }}>
              {Array(columnsDynamic)
                .fill(null)
                .map((_, indexTd) => (
                  <td key={indexTd} />
                ))}
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

export default TableLoading;
