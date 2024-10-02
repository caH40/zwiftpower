import React from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';

import styles from '../Table.module.css';

import { useResize } from '../../../hook/use-resize';
import CategoryBoxFull from '../../CategoryBoxFull/CategoryBoxFull';
import TdRank from '../Td/TdRank';

import Thead from './Thead';

/**
 * Компонент для отображения сводной таблицы результатов Догонялок за выбранный сезон.
 *
 * @param {Object} props - Свойства компонента.
 * @param {Array} props.resultsSummary - Массив с результатами.
 * @param {Array} props.categories - Массив с категориями которые учитываются в общем зачете.
 * @returns {JSX.Element} Сводная таблица достижений.
 */
function TableCatchupSummary({ resultsSummary = [], categories }) {
  const { role } = useSelector((state) => state.checkAuth.value.user);
  const { isScreenLg: lg, isScreenSm: sm } = useResize();

  const isModerator = ['admin', 'moderator'].includes(role);

  // Фильтруем массив результатов, оставляя только те, которые принадлежат выбранным категориям.
  const resultsSummaryFiltered = resultsSummary.filter((elm) =>
    categories.includes(elm.groupCategory)
  );

  return (
    <table className={styles.table}>
      <caption className={styles.caption}>Общий зачет сезона</caption>
      <Thead lg={lg} sm={sm} isModerator={isModerator} />
      <tbody>
        {resultsSummaryFiltered.map((result, index) => (
          <tr key={result.id}>
            <td className={cn(styles.onlyContent, styles.centerTd)}>
              <TdRank value={index + 1} />
            </td>

            <td className={cn(styles.onlyContent, styles.centerTd, styles.bold)}>
              {result.winsTotal}
            </td>

            <td>
              <CategoryBoxFull
                showLabel={true}
                label={result.groupCategory !== 'E' ? result.groupCategory : 'APlus'}
                full={true}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableCatchupSummary;
