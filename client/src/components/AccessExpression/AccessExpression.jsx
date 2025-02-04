import { createHtml } from '../../utils/html';

import styles from './AccessExpression.module.css';

/**
 * Блок описания AccessExpression в описании Эвента. Данные отображаются в виде строки (старый вариант),
 * или в виде таблицы с описанием.
 */
export default function AccessExpression({ description }) {
  let dataParsed = null;
  try {
    dataParsed = description ? JSON.parse(description) : null;
  } catch (_) {
    dataParsed = description;
  }

  return (
    <div className={styles.wrapper}>
      {dataParsed?.table ? (
        <>
          <div>{dataParsed.table.description}</div>
          <table className={styles.table}>
            <thead>
              <tr>
                {dataParsed.table.th.map((header, index) => (
                  <th key={index} className={styles.th} scope="col">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataParsed.table.tds.map((row, rowIndex) => (
                <tr key={rowIndex} className={styles.tr}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className={styles.td}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p
          className={styles.paragraph}
          dangerouslySetInnerHTML={{
            __html: createHtml.description(
              dataParsed || 'Нет описания распределения по категориям'
            ),
          }}
        ></p>
      )}
    </div>
  );
}
