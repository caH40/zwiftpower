import React from 'react';
import cn from 'classnames';

import { useSelector } from 'react-redux';

import styles from '../Table.module.css';

import { useResize } from '../../../hook/use-resize';
import CategoryBoxFull from '../../CategoryBoxFull/CategoryBoxFull';
import { tdRank } from '../utils/td';

import Thead from './Thead';

function TableCatchupSummary({ resultsSummary = [] }) {
  const { role } = useSelector((state) => state.checkAuth.value.user);
  const { isScreenLg: lg, isScreenSm: sm } = useResize();

  const isModerator = ['admin', 'moderator'].includes(role);

  return (
    <table className={`${styles.table} ${styles.table_striped}`}>
      <caption>Общий зачет сезона</caption>
      <Thead lg={lg} sm={sm} isModerator={isModerator} />
      <tbody>
        {resultsSummary.map((result, index) => (
          <tr key={result.id}>
            <td className={cn(styles.onlyContent, styles.centerTd)}>{tdRank(index + 1)}</td>
            <td className={cn(styles.onlyContent, styles.centerTd, styles.bold)}>
              {result.winsTotal}
            </td>
            <td>
              <CategoryBoxFull showLabel={true} label={result.groupCategory} full={true} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableCatchupSummary;
